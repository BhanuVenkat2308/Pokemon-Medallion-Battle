> Historical research: current CP, tier, and rarity values are recorded in [roster-audit.md](roster-audit.md). Earlier custom balance decisions below have been superseded.

# Base CP recommendation

Research date: 2026-10-29. Source: [Bulbapedia — Pokémon Medallion Battle](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Medallion_Battle#Pok%C3%A9mon), including the species tables under Special Pokémon, Gyms, and Raids. Applied to the live roster on 2026-10-29, including existing collections and both raid teams.

## Conclusion

Use the explicit per-species roster-table CP, not a formula based on tier, rarity, RP, or evolution stage. The table values encode different strengths and power tradeoffs. Keep the nine species absent from the reference at their current values until a separate balance decision; label those as recreation values rather than original data.

- Base CP: fixed by species, shared by copies of that species.
- Displayed CP: base CP + saved IV (0–31). A perfect IV remains 31.
- Evolution: replace base CP with the evolved species' base; preserve the IV and the saved power path. Never add the previous species' CP.
- Battle CP: apply active field modifiers and the medallion's actual power conditions. The existing engine floors fractional boosted CP; that rounding remains a local implementation choice.
- RP controls availability, not CP inflation. Ball colors identify tiers, not a single fixed CP per tier.
- Specific table entries take precedence over broad prose. The page says the range starts at 150, but explicitly lists Magikarp at 50. Use 50 for Magikarp rather than silently correcting it to 150.

## Pichu correction implemented

Pichu (#172) is now a 150-base-CP, Poké-tier, 3-star Lightning Pokémon in the pika family. Its documented Thunder Shock grants 1.5× CP against Colorless. It evolves to Pikachu (Volt Tackle targeting Poké tier), then Raichu (Volt Tackle targeting Great tier). These preserve the Super Effective category; the reference explicitly changes the target at each stage.

Pichu replaces Pikachu in the base-species pack pool and is listed in the Pokédex. The family's existing 1150 RP availability is retained rather than moving existing early-game content to the original game's Power Plant gate. Current owned Pikachu/Raichu and the starting team are preserved. Pikachu/Raichu base CP is now 300/550 for existing and new copies. New Pichu uses the source value 150 immediately.

## Complete current-roster comparison

62 species have source entries; nine have no entry. Source values are now applied. CP is derived from species plus saved IV, so no collection reset or save rewrite is needed. Raid HP, accumulated damage, saved powers, and currencies are unchanged.

| Pokémon | Previous base CP | Applied base CP | Basis |
| --- | ---: | ---: | --- |
| Bulbasaur | 450 | 450 | Species table |
| Ivysaur | 650 | 650 | Species table |
| Venusaur | 1150 | 1150 | Species table |
| Charmander | 450 | 450 | Species table |
| Charmeleon | 750 | 750 | Species table |
| Charizard | 1250 | 1250 | Species table |
| Squirtle | 450 | 450 | Species table |
| Wartortle | 650 | 650 | Species table |
| Blastoise | 1150 | 1150 | Species table |
| Caterpie | 200 | 150 | Species table |
| Metapod | 350 | 250 | Species table |
| Butterfree | 650 | 550 | Species table |
| Pidgey | 250 | 150 | Species table |
| Pidgeotto | 500 | 400 | Species table |
| Pidgeot | 1000 | 650 | Species table |
| Rattata | 300 | 300 | Retain recreation value; absent from source |
| Raticate | 650 | 650 | Retain recreation value; absent from source |
| Pikachu | 550 | 300 | Species table |
| Raichu | 1050 | 550 | Species table |
| Sandshrew | 350 | 350 | Retain recreation value; absent from source |
| Sandslash | 800 | 800 | Retain recreation value; absent from source |
| Clefairy | 400 | 250 | Species table |
| Clefable | 900 | 500 | Species table |
| Vulpix | 400 | 250 | Species table |
| Ninetales | 1050 | 650 | Species table |
| Jigglypuff | 350 | 350 | Retain recreation value; absent from source |
| Wigglytuff | 850 | 850 | Retain recreation value; absent from source |
| Oddish | 300 | 200 | Species table |
| Gloom | 550 | 450 | Species table |
| Vileplume | 950 | 500 | Species table |
| Meowth | 400 | 300 | Species table |
| Persian | 800 | 550 | Species table |
| Psyduck | 400 | 250 | Species table |
| Golduck | 900 | 450 | Species table |
| Growlithe | 450 | 400 | Species table |
| Arcanine | 1200 | 650 | Species table |
| Abra | 300 | 300 | Retain recreation value; absent from source |
| Kadabra | 650 | 650 | Retain recreation value; absent from source |
| Alakazam | 1150 | 1150 | Retain recreation value; absent from source |
| Machop | 350 | 150 | Species table |
| Machoke | 650 | 450 | Species table |
| Machamp | 1150 | 1100 | Species table |
| Geodude | 350 | 200 | Species table |
| Graveler | 650 | 450 | Species table |
| Golem | 1100 | 650 | Species table |
| Slowpoke | 350 | 250 | Species table |
| Slowbro | 850 | 650 | Species table |
| Gastly | 350 | 150 | Species table |
| Haunter | 650 | 400 | Species table |
| Gengar | 1150 | 1100 | Species table |
| Onix | 650 | 550 | Species table |
| Cubone | 400 | 200 | Species table |
| Marowak | 800 | 400 | Species table |
| Scyther | 800 | 450 | Species table |
| Magikarp | 200 | 50 | Species table |
| Gyarados | 1250 | 500 | Species table |
| Lapras | 950 | 650 | Species table |
| Eevee | 450 | 300 | Species table |
| Vaporeon | 950 | 650 | Species table |
| Jolteon | 950 | 650 | Species table |
| Flareon | 1000 | 650 | Species table |
| Snorlax | 1200 | 700 | Species table |
| Articuno | 1250 | 1250 | Species table |
| Zapdos | 1250 | 1200 | Species table |
| Moltres | 1250 | 650 | Species table |
| Dratini | 400 | 250 | Species table |
| Dragonair | 750 | 500 | Species table |
| Dragonite | 1300 | 1300 | Species table |
| Mewtwo | 1300 | 900 | Species table |
| Mew | 1100 | 1100 | Species table |
| Pichu | 150 | 150 | Species table |
