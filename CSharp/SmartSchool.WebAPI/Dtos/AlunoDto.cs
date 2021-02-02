using System;

namespace SmartSchool.WebAPI.Dtos
{
    /// <summary>
    /// DTO de Aluno
    /// </summary>
    public class AlunoDto
    {
        /// <summary>
        /// Identificador de chave no banco de dados.
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Identificador da matrícula do aluno.
        /// </summary>
        public int Matricula { get; set; }
        /// <summary>
        /// Nome e sobrenome do aluno.
        /// </summary>
        public string Nome { get; set; }
        /// <summary>
        /// Idade do aluno
        /// </summary>
        public int Idade { get; set; }
        /// <summary>
        /// Telefone do aluno
        /// </summary>
        public string Telefone { get; set; }
        /// <summary>
        /// Data em que o aluno foi matrículado
        /// </summary>
        public DateTime DataInicio { get; set; }
        /// <summary>
        /// Identificador de ativo ou inativo no banco de dados
        /// </summary>
        public bool Ativo { get; set; }

    }
}