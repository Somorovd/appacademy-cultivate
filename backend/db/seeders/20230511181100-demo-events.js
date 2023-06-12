'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Events";
    await queryInterface.bulkInsert(options, [
      {
        venueId: 1,
        groupId: 1,
        name: "Chanting Circle: Harmonizing Energies",
        description: `
        Join us for an enchanting evening of transcendent vocal exploration. 
        Immerse yourself in the power of ancient chants and mantras from 
        various cult traditions. Experience the meditative and transformative 
        qualities of sound as we collectively raise our vibrations. 
        `,
        type: "In Person",
        capacity: 50,
        price: 100,
        startDate: "2023-06-15T23:00",
        endDate: "2023-06-15T01:00"
      },
      {
        venueId: 1,
        groupId: 1,
        name: "Where's My Wife: Communal Living Workshop",
        description: `
        Guest speaker Roxanne Starling details the transformative power of 
        communal living through exercises and guided discussions. 
        We will explore the benefits and challenges of communal lifestyles.
        Learn the practical benefits to leaving the daunting task of free 
        thought to your all-knowing leader and fostering a sense of unity. 
         `,
        type: "In Person",
        capacity: 50,
        price: 100,
        startDate: "2023-06-11T23:00",
        endDate: "2023-06-11T01:00"
      },
      {
        venueId: 1,
        groupId: 1,
        name: "Whispers from Beyond: Cosmic Consciousness Symposium",
        description: `
        Embark on a daring journey of communion with beings from realms unknown. 
        Through ancient divination techniques, seances, and psychic explorations 
        we bridge the gap between mortal minds and alien intellects. Together, 
        we'll unravel the intricacies of their desires and establish a deeper 
        connection to the hidden forces that shape our existence.
         `,
        type: "In Person",
        capacity: 25,
        price: 300,
        startDate: "2023-06-24T03:00",
        endDate: "2023-06-25T11:00"
      },
      {
        venueId: 1,
        groupId: 1,
        name: "The Ultimate Sacrifice: Embracing the Power of Giving",
        description: `
        Discover the power of relinquishing material possessions and embracing 
        a minimalist lifestyle. Our charismatic cult leader will share their 
        unique insights on the profound benefits of surrendering all that you 
        own. Learn how divesting yourself of worldly goods can lead to spiritual 
        liberation and a sense of purpose beyond the material realm.
         `,
        type: "In Person",
        capacity: 120,
        price: 1500,
        startDate: "2023-07-02T23:00",
        endDate: "2023-07-02T01:00"
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Third Quarter Half Moon Howl",
        description: `
        The Third Quarter Half Moon is upon us! It is one of my alltime favorite phases. 
        It's time to gather under the shimmering night sky for an evening of 
        intense, passionate, and stimulaing howling as we tap into the primal 
        instincts that lie within us all.
         `,
        type: "In Person",
        capacity: 120,
        price: 45,
        startDate: "2023-06-11T04:30",
        endDate: "2023-06-11T05:30"
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Waning Cresent (40.6%) Moon Howl",
        description: `
        The Waning Cresent Moon is upon us! It is one of my alltime favorite phases (and 40.6%! What a number!). 
        It's time to gather under the shimmering night sky for an evening of 
        intense, passionate, and stimulaing howling as we tap into the primal 
        instincts that lie within us all.
         `,
        type: "In Person",
        capacity: 120,
        price: 45,
        startDate: "2023-06-12T04:30",
        endDate: "2023-06-12T05:30"
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Waning Cresent (30.0%) Moon Howl",
        description: `
        The Waning Cresent Moon is upon us! It is one of my alltime favorite phases (and 30.0%! What a number!). 
        It's time to gather under the shimmering night sky for an evening of 
        intense, passionate, and stimulaing howling as we tap into the primal 
        instincts that lie within us all.
         `,
        type: "In Person",
        capacity: 120,
        price: 45,
        startDate: "2023-06-13T04:30",
        endDate: "2023-06-13T05:30"
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Waning Cresent (20.6%) Moon Howl",
        description: `
        The Waning Cresent Moon is upon us! It is one of my alltime favorite phases (and 20.6%! What a number!). 
        It's time to gather under the shimmering night sky for an evening of 
        intense, passionate, and stimulaing howling as we tap into the primal 
        instincts that lie within us all.
         `,
        type: "In Person",
        capacity: 120,
        price: 45,
        startDate: "2023-06-14T04:30",
        endDate: "2023-06-14T05:30"
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Waning Cresent (12.6%) Moon Howl",
        description: `
        The Waning Cresent Moon is upon us! It is one of my alltime favorite phases (and 12.6%! What a number!). 
        It's time to gather under the shimmering night sky for an evening of 
        intense, passionate, and stimulaing howling as we tap into the primal 
        instincts that lie within us all.
         `,
        type: "In Person",
        capacity: 120,
        price: 45,
        startDate: "2023-06-15T04:30",
        endDate: "2023-06-15T05:30"
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Waning Cresent (6.5%) Moon Howl",
        description: `
        The Waning Cresent Moon is upon us! It is one of my alltime favorite phases (and 6.5%! What a number!). 
        It's time to gather under the shimmering night sky for an evening of 
        intense, passionate, and stimulaing howling as we tap into the primal 
        instincts that lie within us all.
         `,
        type: "In Person",
        capacity: 120,
        price: 45,
        startDate: "2023-06-16T04:30",
        endDate: "2023-06-16T05:30"
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Waning Cresent (2.3%) Moon Howl",
        description: `
        The Waning Cresent Moon is upon us! It is one of my alltime favorite phases (and 2.3%! What a number!). 
        It's time to gather under the shimmering night sky for an evening of 
        intense, passionate, and stimulaing howling as we tap into the primal 
        instincts that lie within us all.
         `,
        type: "In Person",
        capacity: 120,
        price: 45,
        startDate: "2023-06-17T04:30",
        endDate: "2023-06-17T05:30"
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Waning Cresent (0.3%) Moon Howl",
        description: `
        The Waning Cresent Moon is upon us! It is one of my alltime favorite phases (and 0.3%! What a number!). 
        It's time to gather under the shimmering night sky for an evening of 
        intense, passionate, and stimulaing howling as we tap into the primal 
        instincts that lie within us all.
         `,
        type: "In Person",
        capacity: 120,
        price: 45,
        startDate: "2023-06-18T04:30",
        endDate: "2023-06-18T05:30"
      },
      {
        venueId: 2,
        groupId: 2,
        name: "The Hunt",
        description: `
        You know the drill. Bring an alibi. 
         `,
        type: "In Person",
        capacity: 10,
        price: 500,
        startDate: "2023-06-18T05:00",
        endDate: "2023-06-18T11:00"
      },
      {
        venueId: 3,
        groupId: 3,
        name: "Understanding Eggplants: Promoting Larger Harvest",
        description: `
        Learn the tricks professionals use to evaluate their eggplants and 
        prevent premature harvest. Join us for a stimulating session where we 
        show you how to get more from your eggplants. Many people will harvest 
        too early or too frequently, which will greatly effect yield. 
        Understanding the 5 rules of the Farm we strictly enforce will have 
        you harvesting like a stallion in no time!
         `,
        type: "Online",
        capacity: 60,
        price: 75,
        startDate: "2023-06-13T18:00",
        endDate: "2023-06-13T19:20"
      },
      {
        venueId: 3,
        groupId: 3,
        name: "Roxanne's Anthology 101",
        description: `
        In this months anthology lession we will finally begin addressing 
        how to tend to our beautiful flowers. Our flowers come in all 
        shapes and sizes, each one requiring a different techique to acheive 
        the optimal bloom. We will into two sections and break for lunch in 
        between. Many flowers can bloom more tahn once so please join both 
        sections if you can. 
         `,
        type: "In Person",
        capacity: 30,
        price: 250,
        startDate: "2023-06-18T16:00",
        endDate: "2023-06-18T20:00"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Events";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      groupId: [1, 2, 3]
    });
  }
};
