// src/data/wasteData.js
export const WASTE_TYPES = [
  {
    category: "Plastic",
    color: "#93c5fd", // blue-300
    image: "https://trellis.net/wp-content/uploads/2024/07/plasticwastesstock.jpg",
    instructions: [
      "Clean and dry plastic containers before recycling",
      "Remove caps and lids (they're often different plastic types)",
      "Check local guidelines for which plastics are accepted",
      "Don't bag recyclables - place them loose in the bin"
    ],
    hazards: [
      "Can take up to 500 years to decompose in landfills",
      "Breaks down into microplastics that contaminate water sources",
      "Production contributes to fossil fuel consumption"
    ],
    fact: "Only 9% of all plastic ever produced has been recycled.",
    alternatives: [
      "Use reusable containers instead of single-use plastic",
      "Choose products with minimal packaging",
      "Use cloth bags instead of plastic bags"
    ]
  },
  {
    category: "Paper",
    color: "#fcd34d", // amber-300
    image: "https://5.imimg.com/data5/SELLER/Default/2024/1/378579117/IM/XA/RX/1096998/printing-and-writing-paper.jpg",
    instructions: [
      "Keep paper dry and clean",
      "Remove any plastic windows from envelopes",
      "Flatten cardboard boxes to save space",
      "Don't include soiled paper (like pizza boxes with grease)"
    ],
    hazards: [
      "Paper production contributes to deforestation",
      "Recycling paper uses less water than creating new paper"
    ],
    fact: "Recycling one ton of paper saves 17 trees and 7,000 gallons of water.",
    alternatives: [
      "Use both sides of paper when printing",
      "Go digital to reduce paper usage",
      "Use cloth napkins instead of paper ones"
    ]
  },
  {
    category: "Glass",
    color: "#86efac", // green-300
    image: "https://image.made-in-china.com/2f0j00RYUckzbtjfoG/Wholesale-20mm-30mm-37mm-Clear-Small-Empty-Jar-Mini-Glass-Bottle.webp",
    instructions: [
      "Rinse glass containers to remove residue",
      "Remove lids and caps (recycle separately if possible)",
      "Don't include broken glass (it's hazardous to workers)",
      "Check if your community requires separation by color"
    ],
    hazards: [
      "Glass never decomposes in landfills",
      "Production requires high temperatures and energy"
    ],
    fact: "Glass can be recycled endlessly without loss of quality.",
    alternatives: [
      "Choose products in reusable glass containers",
      "Repurpose glass jars for storage",
      "Support brands that use recycled glass"
    ]
  },
  {
    category: "Metal",
    color: "#d1d5db", // gray-300
    image: "https://media.istockphoto.com/id/646996026/photo/metal-profiles-and-tubes-different-stainless-steel-products.jpg?s=612x612&w=0&k=20&c=h3Kmz9NBC9Egi3KvQHVO-_UXBQ2ciU0jEunusO72tIY=",
    instructions: [
      "Rinse cans to remove food residue",
      "Aluminum and steel can usually be recycled together",
      "Remove labels if possible but not required",
      "Crush aluminum cans to save space"
    ],
    hazards: [
      "Mining for new metal causes habitat destruction",
      "Metal production is energy intensive"
    ],
    fact: "Recycling aluminum saves 95% of the energy needed to make new aluminum.",
    alternatives: [
      "Choose products with recycled metal content",
      "Use reusable metal containers instead of disposable",
      "Repurpose metal cans for storage or crafts"
    ]
  },
  {
    category: "Electronics",
    color: "#d8b4fe", // purple-300
    image: "",
    instructions:[ "https://eu-images.contentstack.com/v3/assets/blt8eb3cdfc1fce5194/blt2e8843dc28040907/66508e36ffe6c82c89c55037/e-waste.jpg?disable=upscale&width=1200&height=630&fit=crop",
      "Never put electronics in regular recycling bins",
      "Find certified e-waste recyclers in your area",
      "Remove batteries before recycling devices",
      "Wipe personal data from devices before recycling"
    ],
    hazards: [
      "Electronics contain heavy metals that can leach into soil and water",
      "Burning e-waste releases toxic fumes",
      "Improper handling exposes workers to hazardous materials"
    ],
    fact: "Only 17.4% of e-waste was officially documented as properly collected and recycled in 2019.",
    alternatives: [
      "Repair devices instead of replacing them",
      "Donate working electronics to schools or charities",
      "Choose products with longer lifespans and repairability"
    ]
  },
  {
    category: "Organic",
    color: "#bbf7d0", // green-200
    image: "https://media.istockphoto.com/id/547150468/photo/fresh-bio-waste-and-compost.jpg?s=612x612&w=0&k=20&c=iN9Sjhlb5BiENasbjpN0G3EPfdy92UN9bgcTURD9SSc=",
    instructions: [
      "Compost fruit and vegetable scraps",
      "Avoid composting meat, dairy, or oily foods in home compost",
      "Turn compost regularly to aerate",
      "Keep a balanced mix of greens and browns in your compost"
    ],
    hazards: [
      "Organic waste in landfills produces methane, a potent greenhouse gas",
      "Food waste represents wasted resources used in production"
    ],
    fact: "If food waste were a country, it would be the third-largest greenhouse gas emitter behind China and the US.",
    alternatives: [
      "Meal plan to reduce food waste",
      "Use vegetable scraps to make broth",
      "Donate excess food to food banks"
    ]
  }
];