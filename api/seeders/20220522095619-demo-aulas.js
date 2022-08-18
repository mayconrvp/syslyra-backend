'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Aulas', [
			{
				descricao: "Aula 1 - Introdução à Musica",
				tipo: "Teórica",
        idTurma: 3,
        data: "2022-05-18",
        observacoes:"",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				descricao: "Aula 2 - Introdução à Musica",
				tipo: "Teórica",
        idTurma: 3,
        data: "2022-05-20",
        observacoes:"Continuado a teoria de intrudução à musica.",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				descricao: "Aula 3 - Introdução à Musica",
				tipo: "Prática",
        idTurma: 3,
        data: "2022-05-23",
        observacoes:"Pratica de Introdução realizada com os alunos",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				descricao: "Aula 4 - Introdução à Musica",
				tipo: "Prática",
        idTurma: 3,
        data: "2022-05-25",
        observacoes:"Aplicado atividade avaliativa.",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				descricao: "Aula 1 - Introdução à Musica",
				tipo: "Teórica",
        idTurma: 4,
        data: "2022-05-18",
        observacoes:"",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				descricao: "Aula 2 - Introdução à Musica",
				tipo: "Teórica",
        idTurma: 4,
        data: "2022-05-20",
        observacoes:"Continuado a teoria de intrudução à musica.",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				descricao: "Aula 3 - Introdução à Musica",
				tipo: "Prática",
        idTurma: 4,
        data: "2022-05-23",
        observacoes:"Pratica de Introdução realizada com os alunos",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				descricao: "Aula 4 - Introdução à Musica",
				tipo: "Prática",
        idTurma: 4,
        data: "2022-05-25",
        observacoes:"Aplicado atividade avaliativa.",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},

      
		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Aulas', null, {})
  }
}
