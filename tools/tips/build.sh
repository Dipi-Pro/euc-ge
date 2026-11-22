#!/usr/bin/env bash
# ============================================================================
# "რჩევები" გვერდების აწყობა: tools/tips/ -> tips/
#
# საწყისი ფაილები:
#   articles.tsv              სტატიების სია (თანმიმდევრობით): slug, სათაური ka/en,
#                             მოკლე აღწერა ka/en (ტაბით გაყოფილი, ერთი სტრიქონი = ერთი სტატია)
#   articles/<slug>.ka.html   სტატიის ტექსტი ქართულად (h2, p, ul...)
#   articles/<slug>.en.html   იგივე ინგლისურად
#   head.html / foot.html     ჰედერი და ფუტერი, ყველა გვერდისთვის საერთო
#
# გაშვება (Git Bash): bash tools/tips/build.sh
# შედეგი: tips/index.html (სია) და tips/<slug>.html (სტატიები). tips/-ს ხელით ნუ შეცვლი:
# შემდეგ აწყობაზე გადაიწერება.
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")"
SRC="$(pwd)"
OUT="$SRC/../../tips"
mkdir -p "$OUT"

HEAD="$(cat head.html)"
FOOT="$(cat foot.html)"

slugs=(); tka=(); ten=(); dka=(); den=()
while IFS=$'\t' read -r slug a b c d; do
  [ -z "$slug" ] && continue
  slugs+=("$slug"); tka+=("$a"); ten+=("$b"); dka+=("$c"); den+=("$d")
done < articles.tsv

head_for() { # title desc ogtype current
  local h="$HEAD"
  h="${h//"{{TITLE}}"/$1}"
  h="${h//"{{DESC}}"/$2}"
  h="${h//"{{OGTYPE}}"/$3}"
  h="${h//"{{TIPS_CURRENT}}"/$4}"
  printf '%s\n' "$h"
}
both() { # ka en  -> ორი span, ჩანს არჩეული ენის
  printf '<span data-only="ka">%s</span><span data-only="en">%s</span>' "$1" "$2"
}

# --- სტატიები ---------------------------------------------------------------
n=${#slugs[@]}
for ((i = 0; i < n; i++)); do
  s="${slugs[$i]}"
  {
    head_for "${tka[$i]} — ZIPI.GE" "${dka[$i]}" "article" ""
    printf '    <nav class="crumbs"><a href="index.html" data-t="nav.tips">რჩევები</a> / %s</nav>\n' "$(both "${tka[$i]}" "${ten[$i]}")"
    printf '    <article class="prose" lang="ka" data-only="ka">\n<h1>%s</h1>\n<p class="lead">%s</p>\n' "${tka[$i]}" "${dka[$i]}"
    cat "articles/$s.ka.html"
    printf '    </article>\n'
    printf '    <article class="prose" lang="en" data-only="en">\n<h1>%s</h1>\n<p class="lead">%s</p>\n' "${ten[$i]}" "${den[$i]}"
    cat "articles/$s.en.html"
    printf '    </article>\n'
    printf '    <div class="tip-cta"><p>%s</p><a class="btn btn--sm" data-wa href="https://wa.me/995598666111" target="_blank" rel="noopener" data-t="cta.wa">მოგვწერე WhatsApp-ზე</a></div>\n' \
      "$(both "კითხვა გაქვს? მოგვწერე და დაგეხმარებით." "Got a question? Message us and we'll help.")"
    printf '    <section class="tip-more"><h2>%s</h2><ul>\n' "$(both "სხვა რჩევები" "More tips")"
    for ((j = 0; j < n; j++)); do
      [ "$j" -eq "$i" ] && continue
      printf '      <li><a href="%s.html">%s</a></li>\n' "${slugs[$j]}" "$(both "${tka[$j]}" "${ten[$j]}")"
    done
    printf '    </ul></section>\n'
    printf '%s\n' "$FOOT"
  } > "$OUT/$s.html"
  echo "tips/$s.html"
done

# --- სიის გვერდი --------------------------------------------------------------
{
  head_for "რჩევები რაიდერებისთვის — ZIPI.GE" "მონობორბლის მოვლა, უსაფრთხოება და მოდელის არჩევა: მარტივად." "website" ' aria-current="page"'
  printf '    <div class="tips-head">\n'
  printf '      <p class="eyebrow">%s</p>\n' "$(both "რჩევები" "Tips")"
  printf '      <h1>%s</h1>\n' "$(both "რაიდერის გზამკვლევი" "The rider's guide")"
  printf '      <p class="lead">%s</p>\n' "$(both "მოვლა, უსაფრთხოება და მოდელის არჩევა: მარტივად." "Care, safety and choosing a model, kept simple.")"
  printf '    </div>\n    <div class="tips-grid">\n'
  for ((i = 0; i < n; i++)); do
    printf '      <a class="tip-card" href="%s.html"><span class="tip-card__n">%02d</span><h2>%s</h2><p>%s</p><span class="tip-card__more">%s</span></a>\n' \
      "${slugs[$i]}" "$((i + 1))" "$(both "${tka[$i]}" "${ten[$i]}")" "$(both "${dka[$i]}" "${den[$i]}")" "$(both "წაიკითხე →" "Read →")"
  done
  printf '    </div>\n'
  printf '%s\n' "$FOOT"
} > "$OUT/index.html"
echo "tips/index.html"
