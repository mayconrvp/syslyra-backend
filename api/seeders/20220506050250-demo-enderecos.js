'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Enderecos', [
			{
				logradouro: "Avenida Jerônimo Monteiro",
				numero: "133",
				bairro: "Centro",
        cep: "29500-970",
        idCidade: 1,
        complemento: "",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				logradouro: "Avenida Jerônimo Monteiro",
				numero: "304",
				bairro: "Centro",
        cep: "29500-000",
        idCidade: 1,
        complemento: "",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				logradouro: "Avenida Olívio Correia Pedrosa",
				numero: "133",
				bairro: "Nova Alegre",
        cep: "29500-970",
        idCidade: 1,
        complemento: "",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				logradouro: "Rua Estadual Err",
				numero: "71A",
				bairro: "Laranjeiras",
        cep: "29500-970",
        idCidade: 2,
        complemento: "",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      
		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Enderecos', null, {})
  }
}
