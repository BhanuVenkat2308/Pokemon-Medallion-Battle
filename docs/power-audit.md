> Historical research: current CP, tier, and rarity values are recorded in [roster-audit.md](roster-audit.md). Earlier custom balance decisions below have been superseded.

# Evolution power audit

Reviewed 2026-10-28 against [Bulbapedia's full Pokémon Medallion Battle page](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Medallion_Battle), including Special Pokémon, all 11 Gyms, all 17 Raid rosters, and the Powers/Evolution rules. Target images were read from the live page DOM; tier symbols must not be mistaken for elemental types.

## Rules and scope

A medallion stores its own validated power key. Evolution preserves the power category; it chooses the corresponding evolved move (preferring the same move and target when available). The source does allow targets to change within a category: Pay Day progresses from Great-tier to Ultra-tier opponents. Eevee's branches are an explicit exception and receive their branch's own ability. A powerless medallion can gain a power when evolving. There is no reroll during rendering, loading, or battle creation.

Existing species, IVs, rarity, own types, evolution costs, teams, currency, RP gates, and match structure are retained. Base CP was subsequently aligned with the researched roster on 2026-10-29; see cp-recommendation.md. The move definitions for newly acquired medallions use the researched targets and effects, so their balance can differ from old copies. This is an evolution/power correction, not a complete rebalance to original server values.

## Source gaps and deliberate decisions

- Leech Seed is inconsistent in the source: the evolution narrative explicitly calls it Support; the roster says an opponent debuff. We follow the narrative and the user's existing Support path, retaining the recreation's +100 CP for two deployments. Both Ivysaur and Venusaur share it.
- Power acquisition probabilities are not published. Optional base-species powers use a declared recreation probability of 25% powerless; otherwise available listed powers are selected uniformly. Initial collection copies receive a listed power where available. Powerless evolutions select among the next species' listed powers uniformly; no extra hidden reroll occurs after that. Guaranteed-power and blank-power species follow the researched options.
- Fractional boosted CP is rounded down, an explicit local rule.
- Blank source entries are represented as no power for new copies. Species absent from the page retain recreation powers rather than invented claims of original-game accuracy.
- Multiple listed powers are alternatives, not simultaneously applied powers. None of the current roster's included source moves require a dual-power executor.

## Existing saves

Old saves never recorded individual powers or evolution history. Each old medallion is assigned a stable legacy key preserving its exact current category, target, multiplier, amount, and duration. On evolution that effect persists; a matching documented move name is used at the new stage when available. A Support Ivysaur therefore stays Support as Venusaur. Legacy variants are accepted only for their origin species and its descendants. Imported unknown/cross-family keys are rejected.

Previously evolved Pokémon cannot have their lost historical power inferred safely. For example, an old Venusaur already showing VS Water keeps that current effect; the app cannot know whether it previously came from a Support Ivysaur. New evolution no longer loses that information. Legacy copies and researched new copies can intentionally differ; details always show the actual saved effect.

## Current 71-species roster

62 species have entries on the reference page; the remaining 9 are recreation additions. This table describes new acquisitions. Legacy copies follow the migration rule above.

| Pokémon | Coverage | Configured options |
| --- | --- | --- |
| Bulbasaur | Source entry | Vine Whip: 1.5× CP against Water Pokémon. Activates once per match. |
| Ivysaur | Source entry | Power Whip: 2× CP against Water Pokémon. Activates once per match.<br>Leech Seed: Your next 2 deployed Pokémon gain 100 CP. Activates once per match. |
| Venusaur | Source entry | Solar Beam: 2.5× CP against Water Pokémon. Activates once per match.<br>Leech Seed: Your next 2 deployed Pokémon gain 100 CP. Activates once per match. |
| Charmander | Source entry | Ember: 1.5× CP against Grass Pokémon. Activates once per match. |
| Charmeleon | Source entry | Fire Spin: 1.5× CP against Grass Pokémon. Activates once per match. |
| Charizard | Source entry | Fire Spin: 1.5× CP against Grass Pokémon. Activates once per match. |
| Squirtle | Source entry | Bubble: 1.5× CP against Fire Pokémon. Activates once per match. |
| Wartortle | Source entry | Bubble Beam: 2× CP against Fire Pokémon. Activates once per match.<br>Rapid Spin: Removes all Support and Entry effects before they apply. |
| Blastoise | Source entry | Hydro Pump: 2.5× CP against Fire Pokémon. Activates once per match.<br>Rapid Spin: Removes all Support and Entry effects before they apply. |
| Caterpie | Source entry | No power: No automatic power. Battles using its CP. |
| Metapod | Source entry | Harden: Prevents a loss once. Both medallions return; you lead the next turn. |
| Butterfree | Source entry | Sleep Powder: Prevents a loss once. Both medallions return; you lead the next turn. |
| Pidgey | Source entry | No power: No automatic power. Battles using its CP. |
| Pidgeotto | Source entry | Gust: 1.5× CP against Grass Pokémon. Activates once per match. |
| Pidgeot | Source entry | Gust: 1.5× CP against Grass Pokémon. Activates once per match. |
| Rattata | Recreation addition | Quick Attack: If stronger after existing field effects, wins before new powers activate. |
| Raticate | Recreation addition | Hyper Fang: 2× CP against Psychic Pokémon. Activates once per match. |
| Pikachu | Source entry | Volt Tackle: 1.5× CP against Poké tier Pokémon. Activates once per match. |
| Raichu | Source entry | Volt Tackle: 1.5× CP against Great tier Pokémon. Activates once per match. |
| Sandshrew | Recreation addition | Sand Attack: Your opponent’s next 2 deployed Pokémon lose 100 CP. Activates once per match. |
| Sandslash | Recreation addition | Spikes: Your opponent’s next 2 deployed Pokémon lose 100 CP. Activates once per match. |
| Clefairy | Source entry | Metronome: 2× CP against Great tier Pokémon. Activates once per match. |
| Clefable | Source entry | Metronome: 2× CP against Ultra tier Pokémon. Activates once per match.<br>Moonlight: All Psychic Pokémon gain 100 CP for the rest of this match. |
| Vulpix | Source entry | Ember: 1.5× CP against Grass Pokémon. Activates once per match. |
| Ninetales | Source entry | Will-O-Wisp: 2× CP against Grass Pokémon. Activates once per match. |
| Jigglypuff | Recreation addition | Sing: Prevents a loss once. Both medallions return; you lead the next turn. |
| Wigglytuff | Recreation addition | Helping Hand: Your next 2 deployed Pokémon gain 100 CP. Activates once per match. |
| Oddish | Source entry | Razor Leaf: 1.5× CP against Water Pokémon. Activates once per match. |
| Gloom | Source entry | Razor Leaf: 1.5× CP against Water Pokémon. Activates once per match.<br>Acid: 1.5× CP against Grass Pokémon. Activates once per match. |
| Vileplume | Source entry | Petal Dance: 1.5× CP against Great tier Pokémon. Activates once per match. |
| Meowth | Source entry | Pay Day: 2× CP against Great tier Pokémon. Activates once per match. |
| Persian | Source entry | Pay Day: 2× CP against Ultra tier Pokémon. Activates once per match. |
| Psyduck | Source entry | Foresight: Reveals a random medallion on the opposing bench. |
| Golduck | Source entry | Foresight: Reveals a random medallion on the opposing bench.<br>Confusion: 1.5× CP against Fighting Pokémon. Activates once per match. |
| Growlithe | Source entry | Baton Pass: Your next 1 deployed Pokémon gain 100 CP. Activates once per match. |
| Arcanine | Source entry | Baton Pass: Your next 1 deployed Pokémon gain 100 CP. Activates once per match.<br>Extreme Speed: If stronger after existing field effects, wins before new powers activate. |
| Abra | Recreation addition | Teleport: Prevents a loss once. Both medallions return; you lead the next turn. |
| Kadabra | Recreation addition | Kinesis: Reveals a random medallion on the opposing bench. |
| Alakazam | Recreation addition | Psychic: 2× CP against Fighting Pokémon. Activates once per match. |
| Machop | Source entry | No power: No automatic power. Battles using its CP. |
| Machoke | Source entry | Cross Chop: 1.5× CP against Colorless Pokémon. Activates once per match. |
| Machamp | Source entry | Cross Chop: 1.5× CP against Colorless Pokémon. Activates once per match. |
| Geodude | Source entry | No power: No automatic power. Battles using its CP. |
| Graveler | Source entry | Rock Throw: 1.5× CP against Lightning Pokémon. Activates once per match. |
| Golem | Source entry | Rock Slide: 2× CP against Lightning Pokémon. Activates once per match.<br>Magnitude: 2× CP against Poké tier Pokémon. Activates once per match. |
| Slowpoke | Source entry | Confusion: 1.5× CP against Fighting Pokémon. Activates once per match. |
| Slowbro | Source entry | Psychic: 2× CP against Fighting Pokémon. Activates once per match. |
| Gastly | Source entry | No power: No automatic power. Battles using its CP. |
| Haunter | Source entry | Lick: 1.5× CP against Psychic Pokémon. Activates once per match. |
| Gengar | Source entry | Dream Eater: 2× CP against Fighting Pokémon. Activates once per match.<br>Haze: Removes all Support and Entry effects before they apply. |
| Onix | Source entry | Stealth Rock: Your opponent’s next 1 deployed Pokémon lose 200 CP. Activates once per match.<br>Earthquake: 2.5× CP against Lightning Pokémon. Activates once per match. |
| Cubone | Source entry | No power: No automatic power. Battles using its CP. |
| Marowak | Source entry | Bonemerang: 2× CP against Lightning Pokémon. Activates once per match. |
| Scyther | Source entry | Fury Cutter: 1.5× CP against Psychic Pokémon. Activates once per match. |
| Magikarp | Source entry | No power: No automatic power. Battles using its CP. |
| Gyarados | Source entry | Outrage: 1.5× CP against Great tier Pokémon. Activates once per match. |
| Lapras | Source entry | Rain Dance: All Water Pokémon gain 50 CP for the rest of this match.<br>Ice Beam: 2× CP against Grass Pokémon. Activates once per match. |
| Eevee | Source entry | Last Resort: 1.5× CP against Poké tier Pokémon. Activates once per match. |
| Vaporeon | Source entry | Acid Armor: Prevents a loss once. Both medallions return; you lead the next turn. |
| Jolteon | Source entry | Quick Attack: If stronger after existing field effects, wins before new powers activate. |
| Flareon | Source entry | Fire Blast: 2.5× CP against Grass Pokémon. Activates once per match. |
| Snorlax | Source entry | No power: No automatic power. Battles using its CP. |
| Dratini | Source entry | No power: No automatic power. Battles using its CP. |
| Dragonair | Source entry | No power: No automatic power. Battles using its CP. |
| Dragonite | Source entry | No power: No automatic power. Battles using its CP. |
| Articuno | Source entry | Ice Beam: 2× CP against Grass Pokémon. Activates once per match. |
| Zapdos | Source entry | Thunderbolt: 2× CP against Colorless Pokémon. Activates once per match. |
| Moltres | Source entry | Sky Attack: 2× CP against Ultra tier Pokémon. Activates once per match. |
| Mewtwo | Source entry | Psystrike: 1.5× CP against Ultra tier Pokémon. Activates once per match. |
| Mew | Source entry | Ancient Power: 2× CP against Legendary Pokémon. Activates once per match. |

| Pichu | Source entry (added 2026-10-29) | Thunder Shock: 1.5× CP against Colorless Pokémon; evolves into Pikachu, retaining the Super Effective category. |
