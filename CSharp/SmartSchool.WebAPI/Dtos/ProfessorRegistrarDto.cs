using System;

namespace SmartSchool.WebAPI.Dtos
{
    /// <summary>
    /// DTO de Registrar Professor
    /// </summary>
    public class ProfessorRegistrarDto
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
        /// Sobrenome do professor.
        /// </summary>
        public string Sobrenome { get; set; }
        /// <summary>
        /// Telefone do professor.
        /// </summary>
        public string Telefone { get; set; }
        /// <summary>
        /// Data de contratação do professor.
        /// </summary>
        public DateTime DataInicio { get; set; } = DateTime.Now;
        /// <summary>
        /// Data de desligamento do professor.
        /// </summary>
        public DateTime? DataFim { get; set; } = null;
        /// <summary>
        /// Identificador de ativo ou inativo no banco de dados.
        /// </summary>
        public bool Ativo { get; set; } = true;
    }
}