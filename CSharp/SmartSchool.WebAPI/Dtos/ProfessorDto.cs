using System;

namespace SmartSchool.WebAPI.Dtos
{
    /// <summary>
    /// DTO de Professor
    /// </summary>
    public class ProfessorDto
    {
        /// <summary>
        /// Identificador de chave no banco de dados.
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Identificador de registro de matricula no banco de dados.
        /// </summary>
        public int Registro { get; set; }
        /// <summary>
        /// Nome do professor.
        /// </summary>
        public string Nome { get; set; }
        /// <summary>
        /// Telefone do professor.
        /// </summary>
        public string Telefone { get; set; }
        /// <summary>
        /// Data de inicio do professor.
        /// </summary>
        public DateTime DataInicio { get; set; }
        /// <summary>
        /// Identificador de ativo ou inativo no banco de dados.
        /// </summary>
        public bool Ativo { get; set; } = true;
    }
}