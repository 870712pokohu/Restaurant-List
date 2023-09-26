'use strict';

const { DATE } = require('sequelize');

const restaurants = require('/Users/pokohu/Documents/alphaCamp/restaurant-list/public/jsons/restaurant.json').results

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Restaurants',
      Array.from(restaurants).map((singleRestaurant) =>
      ({
        name: singleRestaurant.name,
        nameEN: singleRestaurant.name_en,
        category: singleRestaurant.category,
        image: singleRestaurant.image,
        location: singleRestaurant.location,
        phone: singleRestaurant.phone,
        googleMap: singleRestaurant.google_map,
        rating: singleRestaurant.rating,
        description: singleRestaurant.description,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null)
  }
};
