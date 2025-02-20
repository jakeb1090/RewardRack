console.log('localStorage.js loaded');

let cards = [
  {
      "name": "SimplyCashTM Preferred Card from American Express",
      "bank": "Amex",
      "image": "https://icm.aexp-static.com/Internet/internationalcardshop/en_ca/images/cards/SimplyCash_Preferred_Card.png",
      "type": "Cashback",
      "point_type": false,
      "points": {
          "general": 2.0,
          "restaurant": 2.0,
          "grocery": 2.0,
          "drug_store": 2.0,
          "gas": 2.0,
          "travel": 2.0,
          "entertainment": 2.0,
          "bill_payments": 2.0,
          "store_specific": false
      }
  },
  {
      "name": "SimplyCashTM Card from American Express",
      "bank": "Amex",
      "image": "https://icm.aexp-static.com/Internet/internationalcardshop/en_ca/images/cards/SimplyCash_Card.png",
      "type": "Cashback",
      "point_type": false,
      "points": {
          "general": 1.25,
          "restaurant": 1.25,
          "grocery": 1.25,
          "drug_store": 1.25,
          "gas": 1.25,
          "travel": 1.25,
          "entertainment": 1.25,
          "bill_payments": 1.25,
          "store_specific": false
      }
  },
  {
      "name": "American Express® Aeroplan® Reserve Card",
      "bank": "Amex",
      "image": "https://icm.aexp-static.com/Internet/internationalcardshop/en_ca/images/cards/aeroplan-reserve-card.png",
      "type": "Points",
      "point_type": "Air Miles",
      "points": {
          "general": 0.0,
          "restaurant": 0.0,
          "grocery": 0.0,
          "drug_store": 0.0,
          "gas": 0.0,
          "travel": 0.0,
          "entertainment": 0.0,
          "bill_payments": 0.0,
          "store_specific": false
      }
  },
  {
      "name": "American Express® Aeroplan® Card",
      "bank": "Amex",
      "image": "https://icm.aexp-static.com/Internet/internationalcardshop/en_ca/images/cards/aeroplan-card.png",
      "type": "Points",
      "point_type": "Air Miles",
      "points": {
          "general": 0.0,
          "restaurant": 0.0,
          "grocery": 0.0,
          "drug_store": 0.0,
          "gas": 0.0,
          "travel": 0.0,
          "entertainment": 0.0,
          "bill_payments": 0.0,
          "store_specific": false
      }
  },
  {
      "name": "American Express CobaltTM Card",
      "bank": "Amex",
      "image": "https://icm.aexp-static.com/Internet/internationalcardshop/en_ca/images/cards/American_Express_Cobalt_Card.png",
      "type": "Points",
      "point_type": "Air Miles",
      "points": {
          "general": 0.0,
          "restaurant": 0.0,
          "grocery": 0.0,
          "drug_store": 0.0,
          "gas": 0.0,
          "travel": 0.0,
          "entertainment": 0.0,
          "bill_payments": 0.0,
          "store_specific": false
      }
  },
  {
      "name": "The American Express® Gold Rewards Card",
      "bank": "Amex",
      "image": "https://icm.aexp-static.com/Internet/internationalcardshop/en_ca/images/cards/Gold_Rewards_Card.png",
      "type": "Points",
      "point_type": "Air Miles",
      "points": {
          "general": 0.0,
          "restaurant": 0.0,
          "grocery": 0.0,
          "drug_store": 0.0,
          "gas": 0.0,
          "travel": 0.0,
          "entertainment": 0.0,
          "bill_payments": 0.0,
          "store_specific": false
      }
  },
  {
      "name": "The Platinum Card®",
      "bank": "Amex",
      "image": "https://icm.aexp-static.com/Internet/internationalcardshop/en_ca/images/cards/The_Platinum_Card.png",
      "type": "Points",
      "point_type": "Air Miles",
      "points": {
          "general": 0.0,
          "restaurant": 0.0,
          "grocery": 0.0,
          "drug_store": 0.0,
          "gas": 0.0,
          "travel": 0.0,
          "entertainment": 0.0,
          "bill_payments": 0.0,
          "store_specific": false
      }
  },
  {
      "name": "Choice Card from American Express™",
      "bank": "Amex",
      "image": "https://icm.aexp-static.com/Internet/internationalcardshop/en_ca/images/cards/Choice-Card-Art.png",
      "type": "Points",
      "point_type": "Air Miles",
      "points": {
          "general": 0.0,
          "restaurant": 0.0,
          "grocery": 0.0,
          "drug_store": 0.0,
          "gas": 0.0,
          "travel": 0.0,
          "entertainment": 0.0,
          "bill_payments": 0.0,
          "store_specific": false
      }
  },
  {
      "name": "American Express Essential™ Credit Card",
      "bank": "Amex",
      "image": "https://icm.aexp-static.com/Internet/internationalcardshop/en_ca/images/cards/Essential_Credit_Card.png",
      "type": "Cashback",
      "point_type": false,
      "points": {
          "general": 0.0,
          "restaurant": 0.0,
          "grocery": 0.0,
          "drug_store": 0.0,
          "gas": 0.0,
          "travel": 0.0,
          "entertainment": 0.0,
          "bill_payments": 0.0,
          "store_specific": false
      }
  }
]


let stores = [
  {
      "name": "BaubleBar",
      "image": "//static.rakuten.ca//images/merchant_logos/large/150x40_baublebar1.gif",
      "link": "https://www.rakuten.ca/bauble-bar",
      "cashback": "2.5% Cash Back"
  },
  {
      "name": "Beachbody",
      "image": "//static.rakuten.ca/img/merchant_logo/6046/large-150x40-logo-beachbody.png",
      "link": "https://www.rakuten.ca/beachbody",
      "cashback": "Coupons Only"
  },
  {
      "name": "Bed Bath and Beyond",
      "image": "//static.rakuten.ca/img/store/10711/logo_bed-bath-beyond.png",
      "link": "https://www.rakuten.ca/bed-bath-and-beyond",
      "cashback": "1.0% Cash Back"
  },
  {
      "name": "Bentley Leathers",
      "image": "//static.rakuten.ca/img/store/14317/logo-store-bentley150x40.png",
      "link": "https://www.rakuten.ca/bentley-leathers",
      "cashback": "2.5% Cash Back"
  },
  {
      "name": "Best Buy",
      "image": "//static.rakuten.ca/img/store/4767/bestbuy111-150x40.png",
      "link": "https://www.rakuten.ca/best-buy",
      "cashback": "Up to 1.0%"
  },
  {
      "name": "Best of Vegas",
      "image": "//static.rakuten.ca/img/merchant_logo/10460/large-150x40-bov.png",
      "link": "https://www.rakuten.ca/best-of-vegas",
      "cashback": "2.0% Cash Back"
  },
  {
      "name": "Best Western",
      "image": "//static.rakuten.ca//merchant_images/large/icon_bestwestern.gif",
      "link": "https://www.rakuten.ca/best-western",
      "cashback": "1.5% Cash Back"
  },
  {
      "name": "Bliss",
      "image": "//static.rakuten.ca//images/merchant_logos/large/150x40_bliss.gif",
      "link": "https://www.rakuten.ca/bliss-spa",
      "cashback": "5.0% Cash Back"
  },
  {
      "name": "Bloomingdales",
      "image": "//static.rakuten.ca//images/merchant_logos/large/icon-150x40_bloomingdales_2.gif",
      "link": "https://www.rakuten.ca/bloomingdales",
      "cashback": "1.0% Cash Back"
  },
  {
      "name": "Blue Nile Canada",
      "image": "//static.rakuten.ca//images/merchant_logos/large/150x40_bluenile2.gif",
      "link": "https://www.rakuten.ca/blue-nile",
      "cashback": "1.0% Cash Back"
  },
  {
      "name": "Bluebella",
      "image": "//static.rakuten.ca/img/merchant_logo/16225/150x40-logo-bluebella.png",
      "link": "https://www.rakuten.ca/bluebella.com",
      "cashback": "5.0% Cash Back"
  },
  {
      "name": "BlueNotes",
      "image": "//static.rakuten.ca/images/merchant_logos/large/150x40_bluenotes.jpg",
      "link": "https://www.rakuten.ca/blnts",
      "cashback": "2.5% Cash Back"
  },
  {
      "name": "Bobbi Brown Cosmetics",
      "image": "//static.rakuten.ca/img/store/10071/bobbibrownd-300x80.png",
      "link": "https://www.rakuten.ca/bobbi-brown-cosmetic-ca",
      "cashback": "4.0% Cash Back"
  },
  {
      "name": "Bogs",
      "image": "//static.rakuten.ca//images/merchant_logos/large/150x40_bogs.gif",
      "link": "https://www.rakuten.ca/bogs-footwear-canada",
      "cashback": "2.5% Cash Back"
  },
  {
      "name": "Boohoo.com",
      "image": "//static.rakuten.ca/img/store/11867/logo-store-boohoo150x40.jpg",
      "link": "https://www.rakuten.ca/boohoo",
      "cashback": "5.0% Cash Back"
  },
  {
      "name": "Bowflex",
      "image": "//static.rakuten.ca/img/merchant_logo/10097/large-150x40-bowflex.jpg",
      "link": "https://www.rakuten.ca/bowflex-canada",
      "cashback": "Up to 2.5%"
  },
  {
      "name": "Brahmin",
      "image": "//static.rakuten.ca/img/store/13539/logo-store-brahmin150x40.jpg",
      "link": "https://www.rakuten.ca/brahmin",
      "cashback": "3.5% Cash Back"
  },
  {
      "name": "Bravado Designs",
      "image": "//static.rakuten.ca/img/store/19624/logo-bravado-150x40.png",
      "link": "https://www.rakuten.ca/bravado-designs",
      "cashback": "4.0% Cash Back"
  },
  {
      "name": "Brilliant",
      "image": "//static.rakuten.ca/img/store/19634/logo-brilliant-150x40.png",
      "link": "https://www.rakuten.ca/brilliant",
      "cashback": "Up to $12.50"
  },
  {
      "name": "British Airways",
      "image": "//static.rakuten.ca/images/merchant_logos/large/150x40_britishairways.gif",
      "link": "https://www.rakuten.ca/british-airways",
      "cashback": "1.0% Cash Back"
  },
  {
      "name": "Brooks Brothers",
      "image": "//static.rakuten.ca//images/merchant_logos/large/150x40_brooksbrothers.gif",
      "link": "https://www.rakuten.ca/brooks-brothers",
      "cashback": "2.0% Cash Back"
  },
  {
      "name": "Brother Canada",
      "image": "//static.rakuten.ca/img/store/18373/logo-store-brother150x40.png",
      "link": "https://www.rakuten.ca/brother",
      "cashback": "1.0% Cash Back"
  },
  {
      "name": "Buckle",
      "image": "//static.rakuten.ca/images/merchant_logos/large/150x40_buckle.gif",
      "link": "https://www.rakuten.ca/buckle",
      "cashback": "2.5% Cash Back"
  },
  {
      "name": "Budget Rent a Car",
      "image": "//static.rakuten.ca//images/merchant_logos/large/150x40_budget.gif",
      "link": "https://www.rakuten.ca/budget-rent-a-car",
      "cashback": "1.0% Cash Back"
  },
  {
      "name": "Buffalo David Bitton",
      "image": "//static.rakuten.ca/images/merchant_logos/large/150x40_buffalo2.gif",
      "link": "https://www.rakuten.ca/buffalojeans-ca",
      "cashback": "3.0% Cash Back"
  },
  {
      "name": "Bumble and bumble",
      "image": "//static.rakuten.ca/img/merchant_logo/11956/150x40-bumbleandbumble.jpg",
      "link": "https://www.rakuten.ca/bumbleandbumble",
      "cashback": "4.0% Cash Back"
  },
  {
      "name": "Burton Snowboards",
      "image": "//static.rakuten.ca/img/store/19094/logo-burton-150x40.png",
      "link": "https://www.rakuten.ca/burton-snowboards",
      "cashback": "1.0% Cash Back"
  },
  {
      "name": "Busch Gardens",
      "image": "//static.rakuten.ca/img/merchant_logo/11568/large-150x40-buschgardens.jpg",
      "link": "https://www.rakuten.ca/buschgardens",
      "cashback": "2.5% Cash Back"
  },
  {
      "name": "buybuy Baby",
      "image": "//static.rakuten.ca/img/merchant_logo/11016/150x40-buybuybaby-june-2017.png",
      "link": "https://www.rakuten.ca/buybuy-baby",
      "cashback": "1.0% Cash Back"
  },
  {
      "name": "The Body Shop",
      "image": "//static.rakuten.ca/img/store/8845/logo_body-shop.png",
      "link": "https://www.rakuten.ca/the-body-shop-canada",
      "cashback": "2.0% Cash Back"
  },
  {
      "name": "Cabela's",
      "image": "//static.rakuten.ca/img/merchant_logo/8010/150x40-logo-cabelas.png",
      "link": "https://www.rakuten.ca/cabelas",
      "cashback": "2.0% Cash Back"
  },
  {
      "name": "Cafe Britt",
      "image": "//static.rakuten.ca/images/merchant_logos/large/150x40_cafebritt1.gif",
      "link": "https://www.rakuten.ca/cafe-britt",
      "cashback": "4.0% Cash Back"
  },
  {
      "name": "Calendars.com",
      "image": "//static.rakuten.ca/images/merchant_logos/large/150x40_calendars.gif",
      "link": "https://www.rakuten.ca/calendars-com",
      "cashback": "Up to 7.5%"
  },
  {
      "name": "Call It Spring",
      "image": "//static.rakuten.ca/img/store/15814/150x40-callitspring.png",
      "link": "https://www.rakuten.ca/callitspring",
      "cashback": "2.0% Cash Back"
  },
  {
      "name": "Callaway Apparel",
      "image": "//static.rakuten.ca//images/merchant_logos/large/154x40-callaway.jpg",
      "link": "https://www.rakuten.ca/callaway-apparel",
      "cashback": "2.5% Cash Back"
  },
  {
      "name": "Calvin Klein",
      "image": "//static.rakuten.ca/img/store/10413/150x40-logo-ck.png",
      "link": "https://www.rakuten.ca/calvin-klein",
      "cashback": "2.0% Cash Back"
  },
  {
      "name": "Cambria Suites by Choice Hotels",
      "image": "//static.rakuten.ca/img/merchant_logo/9907/150x40-cambria1.png",
      "link": "https://www.rakuten.ca/cambria-suites",
      "cashback": "1.0% Cash Back"
  },
  {
      "name": "Camper Canada",
      "image": "//static.rakuten.ca/img/store/18146/logo-camper-150x40.png",
      "link": "https://www.rakuten.ca/camper",
      "cashback": "4.0% Cash Back"
  },
  {
      "name": "Canadian Tire",
      "image": "//static.rakuten.ca/img/store/13091/logo_canadian-tire.png",
      "link": "https://www.rakuten.ca/canadian-tire",
      "cashback": "Up to 1.0%"
  },
  {
      "name": "CandleWood Suites",
      "image": "//static.rakuten.ca/img/merchant_logo/9590/150x40-logo-candlewood-march-2017.gif",
      "link": "https://www.rakuten.ca/candlewood-suites",
      "cashback": "2.0% Cash Back"
  },
  {
      "name": "Canon eStore Canada",
      "image": "//static.rakuten.ca/img/merchant_logo/10405/150x40_canonestore.gif",
      "link": "https://www.rakuten.ca/canon-estore-canada",
      "cashback": "1.5% Cash Back"
  },
  {
      "name": "Carhartt",
      "image": "//static.rakuten.ca/img/merchant_logo/11584/large-154x40-Carhartt.jpg",
      "link": "https://www.rakuten.ca/carhartt",
      "cashback": "2.0% Cash Back"
  },
  {
      "name": "CARIUMA",
      "image": "//static.rakuten.ca/img/store/18262/150x40-logo-store.png",
      "link": "https://www.rakuten.ca/cariuma",
      "cashback": "3.5% Cash Back"
  },
  {
      "name": "Carol's Daughter",
      "image": "//static.rakuten.ca/images/merchant_logos/large/150x40_carolsdaughter.gif",
      "link": "https://www.rakuten.ca/carols-daughter",
      "cashback": "4.0% Cash Back"
  },
  {
      "name": "Carter's OshKosh B'gosh",
      "image": "//static.rakuten.ca/images/merchant_logos/large/150x40_Carters.jpg",
      "link": "https://www.rakuten.ca/carters-oshkosh-bgosh-ca",
      "cashback": "1.0% Cash Back"
  },
  {
      "name": "Case-Mate",
      "image": "//static.rakuten.ca/img/merchant_logo/11104/150x40-casemate.png",
      "link": "https://www.rakuten.ca/case-mate",
      "cashback": "5.0% Cash Back"
  },
  {
      "name": "Casper",
      "image": "//static.rakuten.ca/img/merchant_logo/15979/150x40-logo-casper.png",
      "link": "https://www.rakuten.ca/casper",
      "cashback": "3.0% Cash Back"
  },
  {
      "name": "CAT Footwear",
      "image": "//static.rakuten.ca/img/store/11958/logo-cat-150x40.png",
      "link": "https://www.rakuten.ca/catfootwear",
      "cashback": "1.5% Cash Back"
  },
  {
      "name": "Caudalie",
      "image": "//static.rakuten.ca/img/store/14384/caudalie_icon-150x40.gif",
      "link": "https://www.rakuten.ca/caudalie",
      "cashback": "4.0% Cash Back"
  },
  {
      "name": "Chapters-Indigo",
      "image": "//static.rakuten.ca/img/store/9254/indigo-ret-300x80.png",
      "link": "https://www.rakuten.ca/chapters-indigo-ca",
      "cashback": "Up to 4.0%"
  },
  {
      "name": "Charles & Keith",
      "image": "//static.rakuten.ca/img/store/16275/logo-charles-kieth150x40.png",
      "link": "https://www.rakuten.ca/charleskeith",
      "cashback": "2.5% Cash Back"
  },
  {
      "name": "Charlotte Tilbury",
      "image": "//static.rakuten.ca/img/store/15443/charlotte-tilburyd-300x80.png",
      "link": "https://www.rakuten.ca/charlotte-tilbury",
      "cashback": "2.0% Cash Back"
  },
  {
      "name": "Chatters Hair",
      "image": "//static.rakuten.ca/img/store/19137/logo-chatters-150x40.png",
      "link": "https://www.rakuten.ca/chatters",
      "cashback": "3.5% Cash Back"
  },
  {
      "name": "CheapAir.com",
      "image": "//static.rakuten.ca//merchant_images/large/icon_cheapair.com.gif",
      "link": "https://www.rakuten.ca/cheapair-com",
      "cashback": "Up to 2.5%"
  },
  {
      "name": "CheapOair.ca",
      "image": "//static.rakuten.ca/img/merchant_logo/9962/large-150x40-logo-cheapoair-oct-2016.png",
      "link": "https://www.rakuten.ca/cheapoair-ca",
      "cashback": "Up to $7.50"
  },
  {
      "name": "CheapTickets",
      "image": "//static.rakuten.ca//merchant_images/large/icon_cheaptickets.gif",
      "link": "https://www.rakuten.ca/cheaptickets",
      "cashback": "Up to 5.0%"
  },
  {
      "name": "Chefs Plate",
      "image": "//static.rakuten.ca/img/merchant_logo/16059/150x40-chefsplate.png",
      "link": "https://www.rakuten.ca/chefsplate",
      "cashback": "$15.00 Cash Back"
  },
  {
      "name": "Chico's",
      "image": "//static.rakuten.ca//images/merchant_logos/large/150x40_chicos.gif",
      "link": "https://www.rakuten.ca/chicos",
      "cashback": "2.0% Cash Back"
  },
  {
      "name": "Chinese Laundry",
      "image": "//static.rakuten.ca/merchant_images/large/icon_chineselaundry.gif",
      "link": "https://www.rakuten.ca/chinese-laundry",
      "cashback": "5.0% Cash Back"
  },
  {
      "name": "Choice Hotels",
      "image": "//static.rakuten.ca/img/store/9098/logo-store-choice-hotels150x40.png",
      "link": "https://www.rakuten.ca/choice-hotels",
      "cashback": "1.0% Cash Back"
  }
]

let amexCards = [
  {
    "cardName": "The Platinum Card®",
    "cardImage": "https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/platinum-card.png",
    "benefits": [
      "5x points on flights booked directly with airlines (points cap applies)",
      "Up to $20/month back at participating digital entertainment partners",
      "Access to 1400+ airport lounges worldwide with American Express Global Lounge Collection®"
    ],
    "welcomeOffer": "150,000 Membership Rewards® Points after spending $8,000 in first 6 months"
  },
  {
    "cardName": "American Express® Gold Card",
    "cardImage": "https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/gold-card.png",
    "benefits": [
      "4X points at restaurants worldwide (up to $50K)",
      "4X points at U.S. supermarkets (up to $25K)",
      "3X points on flights booked directly with airlines"
    ],
    "welcomeOffer": "90,000 Membership Rewards® Points after spending $6,000 in first 6 months"
  },
  {
    "cardName": "Blue Cash Preferred® Card",
    "cardImage": "https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/blue-cash-preferred.png",
    "benefits": [
      "6% cash back at U.S. supermarkets (up to $6K)",
      "6% cash back on select U.S. streaming subscriptions",
      "3% cash back on transit purchases"
    ],
    "welcomeOffer": "$300 back after spending $3,000 in first 6 months"
  },
  {
    "cardName": "Blue Cash Everyday® Card",
    "cardImage": "https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/blue-cash-everyday.png",
    "benefits": [
      "3% cash back at U.S. supermarkets (up to $6K, then 1%)",
      "3% cash back on U.S. online retail purchases (up to $6K, then 1%)",
      "3% cash back at U.S. gas stations (up to $6K, then 1%)"
    ],
    "welcomeOffer": "$200 back after spending $2,000 in first 6 months"
  },
  {
    "cardName": "Delta SkyMiles® Gold Card",
    "cardImage": "https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/gold-delta-skymiles.png",
    "benefits": [
      "Save 15% on Delta Award Travel",
      "$200 Delta Flight Credit after $10,000 spend in a year",
      "2X Miles on Delta purchases, restaurants and U.S. supermarkets"
    ],
    "welcomeOffer": "80,000 Bonus Miles after spending $3,000 in first 6 months (ends 4/2/25)"
  },
  {
    "cardName": "Delta SkyMiles® Platinum Card",
    "cardImage": "https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/platinum-delta-skymiles.png",
    "benefits": [
      "MQD Headstart and MQD Boost",
      "Save 15% on Delta Award Travel",
      "First checked bag free + Zone 5 Priority Boarding"
    ],
    "welcomeOffer": "90,000 Bonus Miles after spending $4,000 in first 6 months (ends 4/2/25)"
  },
  {
    "cardName": "Marriott Bonvoy Bevy™ Card",
    "cardImage": "https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/marriott-bonvoy-bevy-card.png",
    "benefits": [
      "6X points at hotels participating in Marriott Bonvoy®"
    ],
    "welcomeOffer": "Not specified"
  }
]

    localStorage.setItem("amexCards", JSON.stringify(amexCards));
    localStorage.setItem("stores", JSON.stringify(stores));
    console.log("Credit card data stored in localStorage");