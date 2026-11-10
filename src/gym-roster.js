// Source: Bulbapedia Pokémon Medallion Battle. Generated from docs/gym-source.json.
// Special groups 1–10 merge into gyms 2–11; gym indices are zero-based.
export const GYM_ROSTER = [
 {
  "id": 1,
  "name": "Bulbasaur",
  "type": "Grass",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Vine Whip"
   }
  ],
  "optional": true,
  "evolution": 2,
  "family": "bulba"
 },
 {
  "id": 2,
  "name": "Ivysaur",
  "type": "Grass",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2,
    "name": "Power Whip"
   },
   {
    "kind": "entry",
    "turns": 3,
    "amount": 50,
    "name": "Leech Seed"
   }
  ],
  "optional": true,
  "evolution": 3,
  "family": "bulba"
 },
 {
  "id": 3,
  "name": "Venusaur",
  "type": "Grass",
  "cp": 1150,
  "tier": 3,
  "rarity": 3,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2.5,
    "name": "Solar Beam"
   },
   {
    "kind": "entry",
    "turns": 3,
    "amount": 50,
    "name": "Leech Seed"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "bulba"
 },
 {
  "id": 4,
  "name": "Charmander",
  "type": "Fire",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   }
  ],
  "optional": true,
  "evolution": 5,
  "family": "char"
 },
 {
  "id": 5,
  "name": "Charmeleon",
  "type": "Fire",
  "cp": 750,
  "tier": 2,
  "rarity": 3,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Fire Spin"
   }
  ],
  "optional": true,
  "evolution": 6,
  "family": "char"
 },
 {
  "id": 6,
  "name": "Charizard",
  "type": "Fire",
  "cp": 1250,
  "tier": 3,
  "rarity": 3,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Fire Spin"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "char"
 },
 {
  "id": 7,
  "name": "Squirtle",
  "type": "Water",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Bubble"
   }
  ],
  "optional": true,
  "evolution": 8,
  "family": "squirt"
 },
 {
  "id": 8,
  "name": "Wartortle",
  "type": "Water",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2,
    "name": "Bubble Beam"
   },
   {
    "kind": "clearance",
    "name": "Rapid Spin"
   }
  ],
  "optional": true,
  "evolution": 9,
  "family": "squirt"
 },
 {
  "id": 9,
  "name": "Blastoise",
  "type": "Water",
  "cp": 1150,
  "tier": 3,
  "rarity": 3,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2.5,
    "name": "Hydro Pump"
   },
   {
    "kind": "clearance",
    "name": "Rapid Spin"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "squirt"
 },
 {
  "id": 152,
  "name": "Chikorita",
  "type": "Grass",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Razor Leaf"
   }
  ],
  "optional": true,
  "evolution": 153,
  "family": "family-152"
 },
 {
  "id": 153,
  "name": "Bayleef",
  "type": "Grass",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2.5,
    "name": "Solar Beam"
   },
   {
    "kind": "support",
    "turns": 3,
    "amount": 50,
    "name": "Aromatherapy"
   }
  ],
  "optional": true,
  "evolution": 154,
  "family": "family-152"
 },
 {
  "id": 154,
  "name": "Meganium",
  "type": "Grass",
  "cp": 1150,
  "tier": 3,
  "rarity": 3,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2.5,
    "name": "Solar Beam"
   },
   {
    "kind": "support",
    "turns": 3,
    "amount": 50,
    "name": "Aromatherapy"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-152"
 },
 {
  "id": 155,
  "name": "Cyndaquil",
  "type": "Fire",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   }
  ],
  "optional": true,
  "evolution": 156,
  "family": "family-155"
 },
 {
  "id": 156,
  "name": "Quilava",
  "type": "Fire",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2.5,
    "name": "Eruption"
   },
   {
    "kind": "arena",
    "target": "Fire",
    "amount": 50,
    "name": "Scorcher"
   }
  ],
  "optional": true,
  "evolution": 157,
  "family": "family-155"
 },
 {
  "id": 157,
  "name": "Typhlosion",
  "type": "Fire",
  "cp": 1150,
  "tier": 3,
  "rarity": 3,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2.5,
    "name": "Eruption"
   },
   {
    "kind": "arena",
    "target": "Fire",
    "amount": 50,
    "name": "Scorcher"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-155"
 },
 {
  "id": 158,
  "name": "Totodile",
  "type": "Water",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Water Gun"
   }
  ],
  "optional": true,
  "evolution": 159,
  "family": "family-158"
 },
 {
  "id": 159,
  "name": "Croconaw",
  "type": "Water",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2,
    "name": "Aqua Tail"
   },
   {
    "kind": "effective",
    "target": "Psychic",
    "multiplier": 2,
    "name": "Crunch"
   }
  ],
  "optional": true,
  "evolution": 160,
  "family": "family-158"
 },
 {
  "id": 160,
  "name": "Feraligatr",
  "type": "Water",
  "cp": 1200,
  "tier": 3,
  "rarity": 3,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2,
    "name": "Aqua Tail"
   },
   {
    "kind": "effective",
    "target": "Psychic",
    "multiplier": 2,
    "name": "Crunch"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-158"
 },
 {
  "id": 252,
  "name": "Treecko",
  "type": "Grass",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Razor Leaf"
   }
  ],
  "optional": true,
  "evolution": 253,
  "family": "family-252"
 },
 {
  "id": 253,
  "name": "Grovyle",
  "type": "Grass",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 3,
  "powers": [
   {
    "kind": "priority",
    "name": "Quick Attack"
   },
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 2,
    "name": "Grass Knot"
   }
  ],
  "optional": true,
  "evolution": 254,
  "family": "family-252"
 },
 {
  "id": 254,
  "name": "Sceptile",
  "type": "Grass",
  "cp": 1100,
  "tier": 3,
  "rarity": 3,
  "gym": 3,
  "powers": [
   {
    "kind": "priority",
    "name": "Quick Attack"
   },
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 2,
    "name": "Grass Knot"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-252"
 },
 {
  "id": 255,
  "name": "Torchic",
  "type": "Fire",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   }
  ],
  "optional": true,
  "evolution": 256,
  "family": "family-255"
 },
 {
  "id": 256,
  "name": "Combusken",
  "type": "Fire",
  "cp": 750,
  "tier": 2,
  "rarity": 3,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   },
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 1.5,
    "name": "Double Kick"
   }
  ],
  "optional": true,
  "evolution": 257,
  "family": "family-255"
 },
 {
  "id": 257,
  "name": "Blaziken",
  "type": "Fire",
  "cp": 1200,
  "tier": 3,
  "rarity": 3,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2,
    "name": "Blaze Kick"
   },
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 2,
    "name": "Sky Uppercut"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-255"
 },
 {
  "id": 258,
  "name": "Mudkip",
  "type": "Water",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Water Gun"
   }
  ],
  "optional": true,
  "evolution": 259,
  "family": "family-258"
 },
 {
  "id": 259,
  "name": "Marshtomp",
  "type": "Water",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2,
    "name": "Muddy Water"
   },
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 2,
    "name": "Mud Bomb"
   }
  ],
  "optional": true,
  "evolution": 260,
  "family": "family-258"
 },
 {
  "id": 260,
  "name": "Swampert",
  "type": "Water",
  "cp": 1200,
  "tier": 3,
  "rarity": 3,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2,
    "name": "Muddy Water"
   },
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 2,
    "name": "Mud Bomb"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-258"
 },
 {
  "id": 387,
  "name": "Turtwig",
  "type": "Grass",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Razor Leaf"
   }
  ],
  "optional": true,
  "evolution": 388,
  "family": "family-387"
 },
 {
  "id": 388,
  "name": "Grotle",
  "type": "Grass",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2,
    "name": "Leaf Tornado"
   },
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 2,
    "name": "Earth Power"
   }
  ],
  "optional": true,
  "evolution": 389,
  "family": "family-387"
 },
 {
  "id": 389,
  "name": "Torterra",
  "type": "Grass",
  "cp": 1150,
  "tier": 3,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2.5,
    "name": "Leaf Storm"
   },
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 2.5,
    "name": "Earthquake"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-387"
 },
 {
  "id": 390,
  "name": "Chimchar",
  "type": "Fire",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   }
  ],
  "optional": true,
  "evolution": 391,
  "family": "family-390"
 },
 {
  "id": 391,
  "name": "Monferno",
  "type": "Fire",
  "cp": 550,
  "tier": 2,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 1.5,
    "name": "Flare Blitz"
   }
  ],
  "optional": true,
  "evolution": 392,
  "family": "family-390"
 },
 {
  "id": 392,
  "name": "Infernape",
  "type": "Fire",
  "cp": 850,
  "tier": 3,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "tier3",
    "multiplier": 1.5,
    "name": "Flare Blitz"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-390"
 },
 {
  "id": 393,
  "name": "Piplup",
  "type": "Water",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Bubble"
   }
  ],
  "optional": true,
  "evolution": 394,
  "family": "family-393"
 },
 {
  "id": 394,
  "name": "Prinplup",
  "type": "Water",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "priority",
    "name": "Aqua Jet"
   },
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2.5,
    "name": "Blizzard"
   }
  ],
  "optional": true,
  "evolution": 395,
  "family": "family-393"
 },
 {
  "id": 395,
  "name": "Empoleon",
  "type": "Water",
  "cp": 1100,
  "tier": 3,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "priority",
    "name": "Aqua Jet"
   },
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2.5,
    "name": "Blizzard"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-393"
 },
 {
  "id": 495,
  "name": "Snivy",
  "type": "Grass",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Vine Whip"
   }
  ],
  "optional": true,
  "evolution": 496,
  "family": "family-495"
 },
 {
  "id": 496,
  "name": "Servine",
  "type": "Grass",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2.5,
    "name": "Leaf Storm"
   },
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 1.5,
    "name": "Wring Out"
   }
  ],
  "optional": true,
  "evolution": 497,
  "family": "family-495"
 },
 {
  "id": 497,
  "name": "Serperior",
  "type": "Grass",
  "cp": 1150,
  "tier": 3,
  "rarity": 3,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2.5,
    "name": "Leaf Storm"
   },
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 1.5,
    "name": "Wring Out"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-495"
 },
 {
  "id": 498,
  "name": "Tepig",
  "type": "Fire",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   }
  ],
  "optional": true,
  "evolution": 499,
  "family": "family-498"
 },
 {
  "id": 499,
  "name": "Pignite",
  "type": "Fire",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 5,
  "powers": [
   {
    "kind": "priority",
    "name": "Nitro Charge"
   },
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 2,
    "name": "Heat Crash"
   }
  ],
  "optional": true,
  "evolution": 500,
  "family": "family-498"
 },
 {
  "id": 500,
  "name": "Emboar",
  "type": "Fire",
  "cp": 1100,
  "tier": 3,
  "rarity": 3,
  "gym": 5,
  "powers": [
   {
    "kind": "priority",
    "name": "Nitro Charge"
   },
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 2,
    "name": "Heat Crash"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-498"
 },
 {
  "id": 501,
  "name": "Oshawott",
  "type": "Water",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Water Gun"
   }
  ],
  "optional": true,
  "evolution": 502,
  "family": "family-501"
 },
 {
  "id": 502,
  "name": "Dewott",
  "type": "Water",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2,
    "name": "Razor Shell"
   },
   {
    "kind": "effective",
    "target": "Psychic",
    "multiplier": 2,
    "name": "X-Scissor"
   }
  ],
  "optional": true,
  "evolution": 503,
  "family": "family-501"
 },
 {
  "id": 503,
  "name": "Samurott",
  "type": "Water",
  "cp": 1150,
  "tier": 3,
  "rarity": 3,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2.5,
    "name": "Hydro Pump"
   },
   {
    "kind": "effective",
    "target": "Psychic",
    "multiplier": 2.5,
    "name": "Megahorn"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-501"
 },
 {
  "id": 650,
  "name": "Chespin",
  "type": "Grass",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Vine Whip"
   }
  ],
  "optional": true,
  "evolution": 651,
  "family": "family-650"
 },
 {
  "id": 651,
  "name": "Quilladin",
  "type": "Grass",
  "cp": 550,
  "tier": 2,
  "rarity": 3,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 1.5,
    "name": "Take Down"
   }
  ],
  "optional": true,
  "evolution": 652,
  "family": "family-650"
 },
 {
  "id": 652,
  "name": "Chesnaught",
  "type": "Grass",
  "cp": 850,
  "tier": 3,
  "rarity": 3,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "tier3",
    "multiplier": 1.5,
    "name": "Wood Hammer"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-650"
 },
 {
  "id": 653,
  "name": "Fennekin",
  "type": "Fire",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   }
  ],
  "optional": true,
  "evolution": 654,
  "family": "family-653"
 },
 {
  "id": 654,
  "name": "Braixen",
  "type": "Fire",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Mystical Fire",
    "effects": [
     {
      "kind": "effective",
      "target": "Grass",
      "multiplier": 1.5
     },
     {
      "kind": "reveal",
      "count": 1
     }
    ]
   }
  ],
  "optional": true,
  "evolution": 655,
  "family": "family-653"
 },
 {
  "id": 655,
  "name": "Delphox",
  "type": "Fire",
  "cp": 1200,
  "tier": 3,
  "rarity": 3,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Mystical Fire",
    "effects": [
     {
      "kind": "effective",
      "target": "Grass",
      "multiplier": 1.5
     },
     {
      "kind": "reveal",
      "count": 1
     }
    ]
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-653"
 },
 {
  "id": 656,
  "name": "Froakie",
  "type": "Water",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Bubble"
   }
  ],
  "optional": true,
  "evolution": 657,
  "family": "family-656"
 },
 {
  "id": 657,
  "name": "Frogadier",
  "type": "Water",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Water Shuriken",
    "effects": [
     {
      "kind": "effective",
      "target": "Fire",
      "multiplier": 1.5
     },
     {
      "kind": "reveal",
      "count": 1
     }
    ]
   }
  ],
  "optional": true,
  "evolution": 658,
  "family": "family-656"
 },
 {
  "id": 658,
  "name": "Greninja",
  "type": "Water",
  "cp": 1200,
  "tier": 3,
  "rarity": 3,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Water Shuriken",
    "effects": [
     {
      "kind": "effective",
      "target": "Fire",
      "multiplier": 1.5
     },
     {
      "kind": "reveal",
      "count": 1
     }
    ]
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-656"
 },
 {
  "id": 722,
  "name": "Rowlet",
  "type": "Grass",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Razor Leaf"
   }
  ],
  "optional": true,
  "evolution": 723,
  "family": "family-722"
 },
 {
  "id": 723,
  "name": "Dartrix",
  "type": "Grass",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2,
    "name": "Leaf Blade"
   },
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 2,
    "name": "Spirit Shackle"
   }
  ],
  "optional": true,
  "evolution": 724,
  "family": "family-722"
 },
 {
  "id": 724,
  "name": "Decidueye",
  "type": "Grass",
  "cp": 1200,
  "tier": 3,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2,
    "name": "Leaf Blade"
   },
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 2,
    "name": "Spirit Shackle"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-722"
 },
 {
  "id": 725,
  "name": "Litten",
  "type": "Fire",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   }
  ],
  "optional": true,
  "evolution": 726,
  "family": "family-725"
 },
 {
  "id": 726,
  "name": "Torracat",
  "type": "Fire",
  "cp": 750,
  "tier": 2,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   },
   {
    "kind": "effective",
    "target": "Psychic",
    "multiplier": 1.5,
    "name": "Bite"
   }
  ],
  "optional": true,
  "evolution": 727,
  "family": "family-725"
 },
 {
  "id": 727,
  "name": "Incineroar",
  "type": "Fire",
  "cp": 1200,
  "tier": 3,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2,
    "name": "Fire Fang"
   },
   {
    "kind": "effective",
    "target": "Psychic",
    "multiplier": 2,
    "name": "Darkest Lariat"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-725"
 },
 {
  "id": 728,
  "name": "Popplio",
  "type": "Water",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Water Gun"
   }
  ],
  "optional": true,
  "evolution": 729,
  "family": "family-728"
 },
 {
  "id": 729,
  "name": "Brionne",
  "type": "Water",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2.5,
    "name": "Hydro Pump"
   },
   {
    "kind": "support",
    "turns": 3,
    "amount": 50,
    "name": "Aqua Ring"
   }
  ],
  "optional": true,
  "evolution": 730,
  "family": "family-728"
 },
 {
  "id": 730,
  "name": "Primarina",
  "type": "Water",
  "cp": 1150,
  "tier": 3,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2.5,
    "name": "Sparkling Aria"
   },
   {
    "kind": "support",
    "turns": 3,
    "amount": 50,
    "name": "Aqua Ring"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-728"
 },
 {
  "id": 52,
  "name": "Meowth",
  "type": "Colorless",
  "cp": 300,
  "tier": 1,
  "rarity": 3,
  "gym": 8,
  "powers": [
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 2,
    "name": "Pay Day"
   }
  ],
  "optional": true,
  "evolution": 53,
  "family": "meow"
 },
 {
  "id": 53,
  "name": "Persian",
  "type": "Colorless",
  "cp": 550,
  "tier": 2,
  "rarity": 3,
  "gym": 8,
  "powers": [
   {
    "kind": "effective",
    "target": "tier3",
    "multiplier": 2,
    "name": "Pay Day"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "meow"
 },
 {
  "id": 133,
  "name": "Eevee",
  "type": "Colorless",
  "cp": 300,
  "tier": 1,
  "rarity": 3,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 1.5,
    "name": "Last Resort"
   }
  ],
  "optional": true,
  "evolution": [
   134,
   135,
   136,
   196,
   197,
   470,
   471,
   700
  ],
  "family": "eevee"
 },
 {
  "id": 134,
  "name": "Vaporeon",
  "type": "Water",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 9,
  "powers": [
   {
    "kind": "protect",
    "name": "Acid Armor"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "eevee"
 },
 {
  "id": 135,
  "name": "Jolteon",
  "type": "Lightning",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 9,
  "powers": [
   {
    "kind": "priority",
    "name": "Quick Attack"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "eevee"
 },
 {
  "id": 136,
  "name": "Flareon",
  "type": "Fire",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2.5,
    "name": "Fire Blast"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "eevee"
 },
 {
  "id": 196,
  "name": "Espeon",
  "type": "Psychic",
  "cp": 600,
  "tier": 2,
  "rarity": 3,
  "gym": 9,
  "powers": [
   {
    "kind": "reveal",
    "count": 2,
    "name": "Future Sight"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "eevee"
 },
 {
  "id": 197,
  "name": "Umbreon",
  "type": "Colorless",
  "cp": 500,
  "tier": 2,
  "rarity": 3,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 1.5,
    "name": "Pursuit",
    "effects": [
     {
      "kind": "effective",
      "target": "tier2",
      "multiplier": 1.5
     },
     {
      "kind": "priority"
     }
    ]
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "eevee"
 },
 {
  "id": 470,
  "name": "Leafeon",
  "type": "Grass",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Magical Leaf",
    "effects": [
     {
      "kind": "effective",
      "target": "Water",
      "multiplier": 1.5
     },
     {
      "kind": "reveal",
      "count": 1
     }
    ]
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "eevee"
 },
 {
  "id": 471,
  "name": "Glaceon",
  "type": "Water",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2,
    "name": "Freeze Dry",
    "effects": [
     {
      "kind": "effective",
      "target": "Water",
      "multiplier": 2
     },
     {
      "kind": "effective",
      "target": "Grass",
      "multiplier": 2
     }
    ]
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "eevee"
 },
 {
  "id": 700,
  "name": "Sylveon",
  "type": "Psychic",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 1.5,
    "name": "Disarming Voice",
    "effects": [
     {
      "kind": "effective",
      "target": "Fighting",
      "multiplier": 1.5
     },
     {
      "kind": "reveal",
      "count": 1
     }
    ]
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "eevee"
 },
 {
  "id": 337,
  "name": "Lunatone",
  "type": "Psychic",
  "cp": 400,
  "tier": 1,
  "rarity": 3,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 2.5,
    "name": "Moonblast"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "family-337"
 },
 {
  "id": 338,
  "name": "Solrock",
  "type": "Fighting",
  "cp": 400,
  "tier": 1,
  "rarity": 3,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2.5,
    "name": "Solar Beam"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "family-338"
 },
 {
  "id": 222,
  "name": "Corsola",
  "type": "Water",
  "cp": 350,
  "tier": 1,
  "rarity": 3,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "legendary",
    "multiplier": 2,
    "name": "Ancient Power"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "family-222"
 },
 {
  "id": 777,
  "name": "Togedemaru",
  "type": "Lightning",
  "cp": 400,
  "tier": 1,
  "rarity": 3,
  "gym": 10,
  "powers": [
   {
    "kind": "arena",
    "target": "Lightning",
    "amount": 50,
    "name": "Electric Terrain"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-777"
 },
 {
  "id": 16,
  "name": "Pidgey",
  "type": "Colorless",
  "cp": 150,
  "tier": 1,
  "rarity": 1,
  "gym": 0,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 17,
  "family": "pidge"
 },
 {
  "id": 17,
  "name": "Pidgeotto",
  "type": "Colorless",
  "cp": 400,
  "tier": 1,
  "rarity": 1,
  "gym": 0,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Gust"
   }
  ],
  "optional": true,
  "evolution": 18,
  "family": "pidge"
 },
 {
  "id": 18,
  "name": "Pidgeot",
  "type": "Colorless",
  "cp": 650,
  "tier": 2,
  "rarity": 1,
  "gym": 0,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Gust"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "pidge"
 },
 {
  "id": 21,
  "name": "Spearow",
  "type": "Colorless",
  "cp": 150,
  "tier": 1,
  "rarity": 1,
  "gym": 0,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 22,
  "family": "family-21"
 },
 {
  "id": 22,
  "name": "Fearow",
  "type": "Colorless",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 0,
  "powers": [
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 2,
    "name": "Sky Attack"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "family-21"
 },
 {
  "id": 659,
  "name": "Bunnelby",
  "type": "Colorless",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 0,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 660,
  "family": "family-659"
 },
 {
  "id": 660,
  "name": "Diggersby",
  "type": "Colorless",
  "cp": 600,
  "tier": 2,
  "rarity": 1,
  "gym": 0,
  "powers": [
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 2,
    "name": "Earth Power"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-659"
 },
 {
  "id": 54,
  "name": "Psyduck",
  "type": "Water",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 0,
  "powers": [
   {
    "kind": "reveal",
    "count": 1,
    "name": "Foresight"
   }
  ],
  "optional": true,
  "evolution": 55,
  "family": "duck"
 },
 {
  "id": 55,
  "name": "Golduck",
  "type": "Water",
  "cp": 450,
  "tier": 1,
  "rarity": 2,
  "gym": 0,
  "powers": [
   {
    "kind": "reveal",
    "count": 1,
    "name": "Foresight"
   },
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 1.5,
    "name": "Confusion"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "duck"
 },
 {
  "id": 129,
  "name": "Magikarp",
  "type": "Water",
  "cp": 50,
  "tier": 1,
  "rarity": 2,
  "gym": 0,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 130,
  "family": "magi"
 },
 {
  "id": 130,
  "name": "Gyarados",
  "type": "Water",
  "cp": 500,
  "tier": 2,
  "rarity": 2,
  "gym": 0,
  "powers": [
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 1.5,
    "name": "Outrage"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "magi"
 },
 {
  "id": 143,
  "name": "Snorlax",
  "type": "Colorless",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 0,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "snor"
 },
 {
  "id": 10,
  "name": "Caterpie",
  "type": "Grass",
  "cp": 150,
  "tier": 1,
  "rarity": 1,
  "gym": 1,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 11,
  "family": "cat"
 },
 {
  "id": 11,
  "name": "Metapod",
  "type": "Grass",
  "cp": 250,
  "tier": 1,
  "rarity": 1,
  "gym": 1,
  "powers": [
   {
    "kind": "protect",
    "name": "Harden"
   }
  ],
  "optional": false,
  "evolution": 12,
  "family": "cat"
 },
 {
  "id": 12,
  "name": "Butterfree",
  "type": "Grass",
  "cp": 550,
  "tier": 2,
  "rarity": 1,
  "gym": 1,
  "powers": [
   {
    "kind": "protect",
    "name": "Sleep Powder"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "cat"
 },
 {
  "id": 13,
  "name": "Weedle",
  "type": "Grass",
  "cp": 150,
  "tier": 1,
  "rarity": 1,
  "gym": 1,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 14,
  "family": "family-13"
 },
 {
  "id": 14,
  "name": "Kakuna",
  "type": "Grass",
  "cp": 250,
  "tier": 1,
  "rarity": 1,
  "gym": 1,
  "powers": [
   {
    "kind": "protect",
    "name": "Harden"
   }
  ],
  "optional": false,
  "evolution": 15,
  "family": "family-13"
 },
 {
  "id": 15,
  "name": "Beedrill",
  "type": "Grass",
  "cp": 550,
  "tier": 2,
  "rarity": 1,
  "gym": 1,
  "powers": [
   {
    "kind": "priority",
    "name": "Agility"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "family-13"
 },
 {
  "id": 187,
  "name": "Hoppip",
  "type": "Grass",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 1,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 188,
  "family": "family-187"
 },
 {
  "id": 188,
  "name": "Skiploom",
  "type": "Grass",
  "cp": 400,
  "tier": 1,
  "rarity": 1,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Bullet Seed"
   }
  ],
  "optional": true,
  "evolution": 189,
  "family": "family-187"
 },
 {
  "id": 189,
  "name": "Jumpluff",
  "type": "Grass",
  "cp": 650,
  "tier": 2,
  "rarity": 1,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Bullet Seed"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-187"
 },
 {
  "id": 43,
  "name": "Oddish",
  "type": "Grass",
  "cp": 200,
  "tier": 1,
  "rarity": 2,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Razor Leaf"
   }
  ],
  "optional": true,
  "evolution": 44,
  "family": "odd"
 },
 {
  "id": 44,
  "name": "Gloom",
  "type": "Grass",
  "cp": 450,
  "tier": 1,
  "rarity": 2,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Razor Leaf"
   },
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Acid"
   }
  ],
  "optional": true,
  "evolution": [
   45,
   182
  ],
  "family": "odd"
 },
 {
  "id": 45,
  "name": "Vileplume",
  "type": "Grass",
  "cp": 500,
  "tier": 2,
  "rarity": 2,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 1.5,
    "name": "Petal Dance"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "odd"
 },
 {
  "id": 182,
  "name": "Bellossom",
  "type": "Grass",
  "cp": 500,
  "tier": 2,
  "rarity": 2,
  "gym": 1,
  "powers": [
   {
    "kind": "arena",
    "target": "Grass",
    "amount": 100,
    "name": "Sunny Day"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "odd"
 },
 {
  "id": 102,
  "name": "Exeggcute",
  "type": "Grass",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Bullet Seed"
   }
  ],
  "optional": true,
  "evolution": 103,
  "family": "family-102"
 },
 {
  "id": 103,
  "name": "Exeggutor",
  "type": "Grass",
  "cp": 650,
  "tier": 2,
  "rarity": 2,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2,
    "name": "Seed Bomb"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-102"
 },
 {
  "id": 214,
  "name": "Heracross",
  "type": "Grass",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 1,
  "powers": [
   {
    "kind": "effective",
    "target": "Psychic",
    "multiplier": 2.5,
    "name": "Megahorn"
   },
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 2.5,
    "name": "Close Combat"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-214"
 },
 {
  "id": 77,
  "name": "Ponyta",
  "type": "Fire",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 2,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 78,
  "family": "family-77"
 },
 {
  "id": 78,
  "name": "Rapidash",
  "type": "Fire",
  "cp": 350,
  "tier": 1,
  "rarity": 1,
  "gym": 2,
  "powers": [
   {
    "kind": "priority",
    "name": "Quick Attack"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-77"
 },
 {
  "id": 661,
  "name": "Fletchling",
  "type": "Colorless",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 2,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 662,
  "family": "family-661"
 },
 {
  "id": 662,
  "name": "Fletchinder",
  "type": "Fire",
  "cp": 400,
  "tier": 1,
  "rarity": 1,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   }
  ],
  "optional": true,
  "evolution": 663,
  "family": "family-661"
 },
 {
  "id": 663,
  "name": "Talonflame",
  "type": "Fire",
  "cp": 650,
  "tier": 2,
  "rarity": 1,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-661"
 },
 {
  "id": 667,
  "name": "Litleo",
  "type": "Fire",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 2,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 668,
  "family": "family-667"
 },
 {
  "id": 668,
  "name": "Pyroar",
  "type": "Fire",
  "cp": 350,
  "tier": 2,
  "rarity": 1,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 2,
    "name": "Noble Roar"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-667"
 },
 {
  "id": 37,
  "name": "Vulpix",
  "type": "Fire",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Ember"
   }
  ],
  "optional": true,
  "evolution": 38,
  "family": "vulp"
 },
 {
  "id": 38,
  "name": "Ninetales",
  "type": "Fire",
  "cp": 650,
  "tier": 2,
  "rarity": 2,
  "gym": 2,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2,
    "name": "Will-o'-the-Wisp"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "vulp"
 },
 {
  "id": 218,
  "name": "Slugma",
  "type": "Fire",
  "cp": 300,
  "tier": 1,
  "rarity": 2,
  "gym": 2,
  "powers": [
   {
    "kind": "protect",
    "name": "Yawn"
   }
  ],
  "optional": true,
  "evolution": 219,
  "family": "family-218"
 },
 {
  "id": 219,
  "name": "Magcargo",
  "type": "Fire",
  "cp": 600,
  "tier": 2,
  "rarity": 2,
  "gym": 2,
  "powers": [
   {
    "kind": "protect",
    "name": "Yawn"
   },
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2,
    "name": "Lava Plume"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-218"
 },
 {
  "id": 126,
  "name": "Magmar",
  "type": "Fire",
  "cp": 400,
  "tier": 1,
  "rarity": 3,
  "gym": 2,
  "powers": [
   {
    "kind": "arena",
    "target": "Fire",
    "amount": 50,
    "name": "Scorcher"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-126"
 },
 {
  "id": 116,
  "name": "Horsea",
  "type": "Water",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 3,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 117,
  "family": "family-116"
 },
 {
  "id": 117,
  "name": "Seadra",
  "type": "Water",
  "cp": 400,
  "tier": 1,
  "rarity": 1,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Bubble"
   }
  ],
  "optional": true,
  "evolution": 230,
  "family": "family-116"
 },
 {
  "id": 230,
  "name": "Kingdra",
  "type": "Water",
  "cp": 650,
  "tier": 2,
  "rarity": 1,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Bubble"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-116"
 },
 {
  "id": 618,
  "name": "Stunfisk",
  "type": "Fighting",
  "cp": 300,
  "tier": 1,
  "rarity": 1,
  "gym": 3,
  "powers": [
   {
    "kind": "protect",
    "name": "Discharge"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-618"
 },
 {
  "id": 746,
  "name": "Wishiwashi",
  "type": "Water",
  "cp": 300,
  "tier": 1,
  "rarity": 1,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2.5,
    "name": "Hydro Pump"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-746"
 },
 {
  "id": 90,
  "name": "Shellder",
  "type": "Water",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2,
    "name": "Razor Shell"
   }
  ],
  "optional": true,
  "evolution": 91,
  "family": "family-90"
 },
 {
  "id": 91,
  "name": "Cloyster",
  "type": "Water",
  "cp": 600,
  "tier": 2,
  "rarity": 2,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2.5,
    "name": "Spike Cannon"
   },
   {
    "kind": "entry",
    "turns": 2,
    "amount": 100,
    "name": "Spikes"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-90"
 },
 {
  "id": 349,
  "name": "Feebas",
  "type": "Water",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Water Pulse"
   }
  ],
  "optional": true,
  "evolution": 350,
  "family": "family-349"
 },
 {
  "id": 350,
  "name": "Milotic",
  "type": "Water",
  "cp": 650,
  "tier": 2,
  "rarity": 2,
  "gym": 3,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2,
    "name": "Waterfall"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-349"
 },
 {
  "id": 131,
  "name": "Lapras",
  "type": "Water",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 3,
  "powers": [
   {
    "kind": "arena",
    "target": "Water",
    "amount": 50,
    "name": "Rain Dance"
   },
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2,
    "name": "Ice Beam"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "lap"
 },
 {
  "id": 81,
  "name": "Magnemite",
  "type": "Lightning",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 4,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 82,
  "family": "family-81"
 },
 {
  "id": 82,
  "name": "Magneton",
  "type": "Lightning",
  "cp": 400,
  "tier": 1,
  "rarity": 1,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 2,
    "name": "Thunderbolt"
   }
  ],
  "optional": true,
  "evolution": 462,
  "family": "family-81"
 },
 {
  "id": 462,
  "name": "Magnezone",
  "type": "Lightning",
  "cp": 1050,
  "tier": 3,
  "rarity": 1,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 2.5,
    "name": "Zap Cannon"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-81"
 },
 {
  "id": 694,
  "name": "Helioptile",
  "type": "Lightning",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 4,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 695,
  "family": "family-694"
 },
 {
  "id": 695,
  "name": "Heliolisk",
  "type": "Lightning",
  "cp": 300,
  "tier": 1,
  "rarity": 1,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 1.5,
    "name": "Parabolic Charge"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-694"
 },
 {
  "id": 702,
  "name": "Dedenne",
  "type": "Lightning",
  "cp": 300,
  "tier": 1,
  "rarity": 1,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 2.5,
    "name": "Thunder"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-702"
 },
 {
  "id": 83,
  "name": "Farfetch'd",
  "type": "Colorless",
  "cp": 400,
  "tier": 1,
  "rarity": 2,
  "gym": 4,
  "powers": [
   {
    "kind": "support",
    "turns": 1,
    "amount": 100,
    "name": "Baton Pass"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-83"
 },
 {
  "id": 309,
  "name": "Electrike",
  "type": "Lightning",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 1.5,
    "name": "Thunder Shock"
   }
  ],
  "optional": true,
  "evolution": 310,
  "family": "family-309"
 },
 {
  "id": 310,
  "name": "Manectric",
  "type": "Lightning",
  "cp": 450,
  "tier": 1,
  "rarity": 2,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 1.5,
    "name": "Thunder Shock"
   },
   {
    "kind": "reveal",
    "count": 1,
    "name": "Odor Sleuth"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-309"
 },
 {
  "id": 172,
  "name": "Pichu",
  "type": "Lightning",
  "cp": 150,
  "tier": 1,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 1.5,
    "name": "Thunder Shock"
   }
  ],
  "optional": true,
  "evolution": 25,
  "family": "pika"
 },
 {
  "id": 25,
  "name": "Pikachu",
  "type": "Lightning",
  "cp": 300,
  "tier": 1,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 1.5,
    "name": "Volt Tackle"
   }
  ],
  "optional": true,
  "evolution": 26,
  "family": "pika"
 },
 {
  "id": 26,
  "name": "Raichu",
  "type": "Lightning",
  "cp": 550,
  "tier": 2,
  "rarity": 3,
  "gym": 4,
  "powers": [
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 1.5,
    "name": "Volt Tackle"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "pika"
 },
 {
  "id": 66,
  "name": "Machop",
  "type": "Fighting",
  "cp": 150,
  "tier": 1,
  "rarity": 1,
  "gym": 5,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 67,
  "family": "mach"
 },
 {
  "id": 67,
  "name": "Machoke",
  "type": "Fighting",
  "cp": 450,
  "tier": 1,
  "rarity": 1,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 1.5,
    "name": "Cross Chop"
   }
  ],
  "optional": true,
  "evolution": 68,
  "family": "mach"
 },
 {
  "id": 68,
  "name": "Machamp",
  "type": "Fighting",
  "cp": 1100,
  "tier": 3,
  "rarity": 1,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 1.5,
    "name": "Cross Chop"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "mach"
 },
 {
  "id": 104,
  "name": "Cubone",
  "type": "Fighting",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 5,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 105,
  "family": "cubo"
 },
 {
  "id": 105,
  "name": "Marowak",
  "type": "Fighting",
  "cp": 400,
  "tier": 1,
  "rarity": 1,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 2,
    "name": "Bonemerang"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "cubo"
 },
 {
  "id": 556,
  "name": "Maractus",
  "type": "Grass",
  "cp": 300,
  "tier": 1,
  "rarity": 1,
  "gym": 5,
  "powers": [
   {
    "kind": "protect",
    "name": "Spiky Shield"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-556"
 },
 {
  "id": 95,
  "name": "Onix",
  "type": "Fighting",
  "cp": 550,
  "tier": 2,
  "rarity": 2,
  "gym": 5,
  "powers": [
   {
    "kind": "entry",
    "turns": 1,
    "amount": 200,
    "name": "Stealth Rock"
   },
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 2.5,
    "name": "Earthquake"
   }
  ],
  "optional": true,
  "evolution": 208,
  "family": "onix"
 },
 {
  "id": 208,
  "name": "Steelix",
  "type": "Colorless",
  "cp": 600,
  "tier": 2,
  "rarity": 2,
  "gym": 5,
  "powers": [
   {
    "kind": "entry",
    "turns": 1,
    "amount": 200,
    "name": "Stealth Rock"
   },
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 2.5,
    "name": "Earthquake"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "onix"
 },
 {
  "id": 453,
  "name": "Croagunk",
  "type": "Psychic",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 1.5,
    "name": "Poison Sting"
   }
  ],
  "optional": true,
  "evolution": 454,
  "family": "family-453"
 },
 {
  "id": 454,
  "name": "Toxicroak",
  "type": "Psychic",
  "cp": 650,
  "tier": 2,
  "rarity": 2,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2,
    "name": "Poison Jab"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-453"
 },
 {
  "id": 447,
  "name": "Riolu",
  "type": "Fighting",
  "cp": 400,
  "tier": 1,
  "rarity": 3,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 2,
    "name": "Force Palm"
   }
  ],
  "optional": true,
  "evolution": 448,
  "family": "family-447"
 },
 {
  "id": 448,
  "name": "Lucario",
  "type": "Fighting",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 5,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 2,
    "name": "Aura Sphere"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-447"
 },
 {
  "id": 46,
  "name": "Paras",
  "type": "Grass",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 6,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 47,
  "family": "family-46"
 },
 {
  "id": 47,
  "name": "Parasect",
  "type": "Grass",
  "cp": 350,
  "tier": 1,
  "rarity": 1,
  "gym": 6,
  "powers": [
   {
    "kind": "protect",
    "name": "Spore"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-46"
 },
 {
  "id": 92,
  "name": "Gastly",
  "type": "Psychic",
  "cp": 150,
  "tier": 1,
  "rarity": 1,
  "gym": 6,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 93,
  "family": "gast"
 },
 {
  "id": 93,
  "name": "Haunter",
  "type": "Psychic",
  "cp": 400,
  "tier": 1,
  "rarity": 1,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Psychic",
    "multiplier": 1.5,
    "name": "Lick"
   }
  ],
  "optional": true,
  "evolution": 94,
  "family": "gast"
 },
 {
  "id": 94,
  "name": "Gengar",
  "type": "Psychic",
  "cp": 1100,
  "tier": 3,
  "rarity": 1,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 2,
    "name": "Dream Eater"
   },
   {
    "kind": "clearance",
    "name": "Haze"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "gast"
 },
 {
  "id": 577,
  "name": "Solosis",
  "type": "Psychic",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 6,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 578,
  "family": "family-577"
 },
 {
  "id": 578,
  "name": "Duosion",
  "type": "Psychic",
  "cp": 400,
  "tier": 1,
  "rarity": 1,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 1.5,
    "name": "Psywave"
   }
  ],
  "optional": true,
  "evolution": 579,
  "family": "family-577"
 },
 {
  "id": 579,
  "name": "Reuniclus",
  "type": "Psychic",
  "cp": 650,
  "tier": 2,
  "rarity": 1,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 1.5,
    "name": "Psywave"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-577"
 },
 {
  "id": 79,
  "name": "Slowpoke",
  "type": "Psychic",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 1.5,
    "name": "Confusion"
   }
  ],
  "optional": true,
  "evolution": [
   80,
   199
  ],
  "family": "slow"
 },
 {
  "id": 80,
  "name": "Slowbro",
  "type": "Psychic",
  "cp": 650,
  "tier": 2,
  "rarity": 2,
  "gym": 6,
  "powers": [
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 2,
    "name": "Psychic"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "slow"
 },
 {
  "id": 199,
  "name": "Slowking",
  "type": "Water",
  "cp": 600,
  "tier": 2,
  "rarity": 2,
  "gym": 6,
  "powers": [
   {
    "kind": "support",
    "turns": 2,
    "amount": 100,
    "name": "Heal Pulse"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "slow"
 },
 {
  "id": 755,
  "name": "Morelull",
  "type": "Grass",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 6,
  "powers": [
   {
    "kind": "support",
    "turns": 2,
    "amount": 50,
    "name": "Synthesis"
   }
  ],
  "optional": true,
  "evolution": 756,
  "family": "family-755"
 },
 {
  "id": 756,
  "name": "Shiinotic",
  "type": "Grass",
  "cp": 400,
  "tier": 1,
  "rarity": 2,
  "gym": 6,
  "powers": [
   {
    "kind": "support",
    "turns": 2,
    "amount": 50,
    "name": "Synthesis"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-755"
 },
 {
  "id": 778,
  "name": "Mimikyu",
  "type": "Psychic",
  "cp": 400,
  "tier": 1,
  "rarity": 3,
  "gym": 6,
  "powers": [
   {
    "kind": "priority",
    "name": "Shadow Sneak"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-778"
 },
 {
  "id": 401,
  "name": "Kricketot",
  "type": "Grass",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 7,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 402,
  "family": "family-401"
 },
 {
  "id": 402,
  "name": "Kricketune",
  "type": "Grass",
  "cp": 400,
  "tier": 1,
  "rarity": 1,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "Psychic",
    "multiplier": 2,
    "name": "Fury Cutter"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-401"
 },
 {
  "id": 111,
  "name": "Rhyhorn",
  "type": "Fighting",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 7,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 112,
  "family": "family-111"
 },
 {
  "id": 112,
  "name": "Rhydon",
  "type": "Fighting",
  "cp": 350,
  "tier": 1,
  "rarity": 2,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 1.5,
    "name": "Take Down"
   }
  ],
  "optional": true,
  "evolution": 464,
  "family": "family-111"
 },
 {
  "id": 464,
  "name": "Rhyperior",
  "type": "Fighting",
  "cp": 800,
  "tier": 3,
  "rarity": 2,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "tier3",
    "multiplier": 1.5,
    "name": "Rock Wrecker"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-111"
 },
 {
  "id": 177,
  "name": "Natu",
  "type": "Psychic",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 7,
  "powers": [
   {
    "kind": "reveal",
    "count": 1,
    "name": "Miracle Eye"
   }
  ],
  "optional": true,
  "evolution": 178,
  "family": "family-177"
 },
 {
  "id": 178,
  "name": "Xatu",
  "type": "Psychic",
  "cp": 450,
  "tier": 1,
  "rarity": 2,
  "gym": 7,
  "powers": [
   {
    "kind": "reveal",
    "count": 1,
    "name": "Miracle Eye"
   },
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 1.5,
    "name": "Psyshock"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-177"
 },
 {
  "id": 213,
  "name": "Shuckle",
  "type": "Grass",
  "cp": 350,
  "tier": 1,
  "rarity": 2,
  "gym": 7,
  "powers": [
   {
    "kind": "entry",
    "turns": 2,
    "amount": 50,
    "name": "Sticky Web"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-213"
 },
 {
  "id": 631,
  "name": "Heatmor",
  "type": "Fire",
  "cp": 700,
  "tier": 2,
  "rarity": 2,
  "gym": 7,
  "powers": [
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 1.5,
    "name": "Lick"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-631"
 },
 {
  "id": 147,
  "name": "Dratini",
  "type": "Colorless",
  "cp": 250,
  "tier": 1,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 148,
  "family": "drat"
 },
 {
  "id": 148,
  "name": "Dragonair",
  "type": "Colorless",
  "cp": 500,
  "tier": 1,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 149,
  "family": "drat"
 },
 {
  "id": 149,
  "name": "Dragonite",
  "type": "Colorless",
  "cp": 1300,
  "tier": 3,
  "rarity": 3,
  "gym": 7,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "drat"
 },
 {
  "id": 216,
  "name": "Teddiursa",
  "type": "Colorless",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 8,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 217,
  "family": "family-216"
 },
 {
  "id": 217,
  "name": "Ursaring",
  "type": "Colorless",
  "cp": 250,
  "tier": 1,
  "rarity": 1,
  "gym": 8,
  "powers": [
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 2,
    "name": "Thrash"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-216"
 },
 {
  "id": 127,
  "name": "Pinsir",
  "type": "Grass",
  "cp": 350,
  "tier": 1,
  "rarity": 2,
  "gym": 8,
  "powers": [
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 1.5,
    "name": "Guillotine"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-127"
 },
 {
  "id": 204,
  "name": "Pineco",
  "type": "Grass",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 8,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 205,
  "family": "family-204"
 },
 {
  "id": 205,
  "name": "Forretress",
  "type": "Grass",
  "cp": 600,
  "tier": 2,
  "rarity": 2,
  "gym": 8,
  "powers": [
   {
    "kind": "clearance",
    "name": "Rapid Spin"
   },
   {
    "kind": "entry",
    "turns": 2,
    "amount": 100,
    "name": "Spikes"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-204"
 },
 {
  "id": 231,
  "name": "Phanpy",
  "type": "Fighting",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 8,
  "powers": [
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 1.5,
    "name": "Bulldoze"
   }
  ],
  "optional": true,
  "evolution": 232,
  "family": "family-231"
 },
 {
  "id": 232,
  "name": "Donphan",
  "type": "Fighting",
  "cp": 700,
  "tier": 2,
  "rarity": 2,
  "gym": 8,
  "powers": [
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 1.5,
    "name": "Bulldoze"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-231"
 },
 {
  "id": 522,
  "name": "Blitzle",
  "type": "Lightning",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 8,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2,
    "name": "Spark"
   }
  ],
  "optional": true,
  "evolution": 523,
  "family": "family-522"
 },
 {
  "id": 523,
  "name": "Zebstrika",
  "type": "Lightning",
  "cp": 400,
  "tier": 1,
  "rarity": 2,
  "gym": 8,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2,
    "name": "Spark"
   },
   {
    "kind": "priority",
    "name": "Quick Attack"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-522"
 },
 {
  "id": 357,
  "name": "Tropius",
  "type": "Grass",
  "cp": 700,
  "tier": 2,
  "rarity": 3,
  "gym": 8,
  "powers": [
   {
    "kind": "support",
    "turns": 2,
    "amount": 50,
    "name": "Synthesis"
   },
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2,
    "name": "Leaf Tornado"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-357"
 },
 {
  "id": 194,
  "name": "Wooper",
  "type": "Water",
  "cp": 200,
  "tier": 1,
  "rarity": 1,
  "gym": 9,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 195,
  "family": "family-194"
 },
 {
  "id": 195,
  "name": "Quagsire",
  "type": "Water",
  "cp": 350,
  "tier": 1,
  "rarity": 1,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 2,
    "name": "Earth Power"
   },
   {
    "kind": "protect",
    "name": "Yawn"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-194"
 },
 {
  "id": 60,
  "name": "Poliwag",
  "type": "Water",
  "cp": 200,
  "tier": 1,
  "rarity": 2,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 1.5,
    "name": "Bubble"
   }
  ],
  "optional": true,
  "evolution": 61,
  "family": "family-60"
 },
 {
  "id": 61,
  "name": "Poliwhirl",
  "type": "Water",
  "cp": 400,
  "tier": 1,
  "rarity": 2,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "Fire",
    "multiplier": 2,
    "name": "Bubble Beam"
   }
  ],
  "optional": true,
  "evolution": [
   62,
   186
  ],
  "family": "family-60"
 },
 {
  "id": 62,
  "name": "Poliwrath",
  "type": "Water",
  "cp": 1100,
  "tier": 3,
  "rarity": 2,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 2,
    "name": "Dynamic Punch"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-60"
 },
 {
  "id": 186,
  "name": "Politoed",
  "type": "Water",
  "cp": 1100,
  "tier": 3,
  "rarity": 2,
  "gym": 9,
  "powers": [
   {
    "kind": "arena",
    "target": "Water",
    "amount": 50,
    "name": "Rain Dance"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-60"
 },
 {
  "id": 200,
  "name": "Misdreavus",
  "type": "Psychic",
  "cp": 600,
  "tier": 1,
  "rarity": 2,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 0.5,
    "name": "Pain Split"
   }
  ],
  "optional": false,
  "evolution": 429,
  "family": "family-200"
 },
 {
  "id": 429,
  "name": "Mismagius",
  "type": "Psychic",
  "cp": 750,
  "tier": 2,
  "rarity": 2,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 0.5,
    "name": "Pain Split"
   }
  ],
  "optional": false,
  "evolution": null,
  "family": "family-200"
 },
 {
  "id": 580,
  "name": "Ducklett",
  "type": "Water",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 1.5,
    "name": "Brave Bird"
   }
  ],
  "optional": true,
  "evolution": 581,
  "family": "family-580"
 },
 {
  "id": 581,
  "name": "Swanna",
  "type": "Water",
  "cp": 350,
  "tier": 1,
  "rarity": 2,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "tier1",
    "multiplier": 1.5,
    "name": "Brave Bird"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-580"
 },
 {
  "id": 757,
  "name": "Salandit",
  "type": "Fire",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2,
    "name": "Fire Lash"
   }
  ],
  "optional": true,
  "evolution": 758,
  "family": "family-757"
 },
 {
  "id": 758,
  "name": "Salazzle",
  "type": "Fire",
  "cp": 450,
  "tier": 1,
  "rarity": 2,
  "gym": 9,
  "powers": [
   {
    "kind": "effective",
    "target": "Grass",
    "multiplier": 2,
    "name": "Fire Lash"
   },
   {
    "kind": "reveal",
    "count": 1,
    "name": "Odor Sleuth"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-757"
 },
 {
  "id": 58,
  "name": "Growlithe",
  "type": "Fire",
  "cp": 400,
  "tier": 1,
  "rarity": 3,
  "gym": 9,
  "powers": [
   {
    "kind": "support",
    "turns": 1,
    "amount": 100,
    "name": "Baton Pass"
   }
  ],
  "optional": true,
  "evolution": 59,
  "family": "grow"
 },
 {
  "id": 59,
  "name": "Arcanine",
  "type": "Fire",
  "cp": 650,
  "tier": 2,
  "rarity": 3,
  "gym": 9,
  "powers": [
   {
    "kind": "support",
    "turns": 1,
    "amount": 100,
    "name": "Baton Pass"
   },
   {
    "kind": "priority",
    "name": "Extreme Speed"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "grow"
 },
 {
  "id": 703,
  "name": "Carbink",
  "type": "Fighting",
  "cp": 300,
  "tier": 1,
  "rarity": 1,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "Lightning",
    "multiplier": 2.5,
    "name": "Power Gem"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-703"
 },
 {
  "id": 173,
  "name": "Cleffa",
  "type": "Psychic",
  "cp": 100,
  "tier": 1,
  "rarity": 2,
  "gym": 10,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 35,
  "family": "clef"
 },
 {
  "id": 35,
  "name": "Clefairy",
  "type": "Psychic",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "tier2",
    "multiplier": 2,
    "name": "Metronome"
   }
  ],
  "optional": true,
  "evolution": 36,
  "family": "clef"
 },
 {
  "id": 36,
  "name": "Clefable",
  "type": "Psychic",
  "cp": 500,
  "tier": 2,
  "rarity": 2,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "tier3",
    "multiplier": 2,
    "name": "Metronome"
   },
   {
    "kind": "arena",
    "target": "Psychic",
    "amount": 100,
    "name": "Moonlight"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "clef"
 },
 {
  "id": 440,
  "name": "Happiny",
  "type": "Colorless",
  "cp": 100,
  "tier": 1,
  "rarity": 2,
  "gym": 10,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 113,
  "family": "family-440"
 },
 {
  "id": 113,
  "name": "Chansey",
  "type": "Colorless",
  "cp": 450,
  "tier": 1,
  "rarity": 2,
  "gym": 10,
  "powers": [
   {
    "kind": "support",
    "turns": 1,
    "amount": 50,
    "name": "Soft-Boiled"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-440"
 },
 {
  "id": 298,
  "name": "Azurill",
  "type": "Water",
  "cp": 100,
  "tier": 1,
  "rarity": 2,
  "gym": 10,
  "powers": [
   {
    "name": "No power",
    "kind": "none"
   }
  ],
  "optional": false,
  "evolution": 183,
  "family": "family-298"
 },
 {
  "id": 183,
  "name": "Marill",
  "type": "Water",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 1.5,
    "name": "Power-Up Punch"
   }
  ],
  "optional": true,
  "evolution": 184,
  "family": "family-298"
 },
 {
  "id": 184,
  "name": "Azumarill",
  "type": "Water",
  "cp": 650,
  "tier": 2,
  "rarity": 2,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "Colorless",
    "multiplier": 2,
    "name": "Superpower"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-298"
 },
 {
  "id": 285,
  "name": "Shroomish",
  "type": "Grass",
  "cp": 250,
  "tier": 1,
  "rarity": 2,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 1.5,
    "name": "Absorb"
   }
  ],
  "optional": true,
  "evolution": 286,
  "family": "family-285"
 },
 {
  "id": 286,
  "name": "Breloom",
  "type": "Grass",
  "cp": 400,
  "tier": 1,
  "rarity": 2,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "Water",
    "multiplier": 2,
    "name": "Seed Bomb"
   },
   {
    "kind": "priority",
    "name": "Mach Punch"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-285"
 },
 {
  "id": 280,
  "name": "Ralts",
  "type": "Psychic",
  "cp": 250,
  "tier": 1,
  "rarity": 3,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 1.5,
    "name": "Psybeam"
   }
  ],
  "optional": true,
  "evolution": 281,
  "family": "family-280"
 },
 {
  "id": 281,
  "name": "Kirlia",
  "type": "Psychic",
  "cp": 450,
  "tier": 1,
  "rarity": 3,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "Fighting",
    "multiplier": 2,
    "name": "Psychic"
   }
  ],
  "optional": true,
  "evolution": [
   282,
   475
  ],
  "family": "family-280"
 },
 {
  "id": 282,
  "name": "Gardevoir",
  "type": "Psychic",
  "cp": 1050,
  "tier": 3,
  "rarity": 3,
  "gym": 10,
  "powers": [
   {
    "kind": "reveal",
    "count": 2,
    "name": "Future Sight"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-280"
 },
 {
  "id": 475,
  "name": "Gallade",
  "type": "Fighting",
  "cp": 600,
  "tier": 3,
  "rarity": 3,
  "gym": 10,
  "powers": [
   {
    "kind": "effective",
    "target": "tier3",
    "multiplier": 2,
    "name": "Psycho Cut"
   }
  ],
  "optional": true,
  "evolution": null,
  "family": "family-280"
 }
];
