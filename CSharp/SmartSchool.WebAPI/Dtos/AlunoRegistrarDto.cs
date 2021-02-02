using System;

namespace SmartSchool.WebAPI.Dtos
{
    /// <summary>
    /// DTO de Registro de Aluno
    /// </summary>
    public class AlunoRegistrarDto
    {
        /// <summary>
        /// Identificador de chame no banco de dados.
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Identificador da matrícula do aluno.
        /// </summary>
        public int Matricula { get; set; }
        /// <summary>
        /// Nome do aluno.
        /// </summary>
        public string Nome { get; set; }
        /// <summary>
        /// Sobrenome do aluno
        /// </summary>
        public string Sobrenome { get; set; }
        /// <summary>
        /// Data de nascimento do aluno
        /// </summary>
        public DateTime DataNasc { get; set; }
        /// <summary>
        /// Telefone do aluno
        /// </summary>
        public string Telefone { get; set; }
        /// <summary>
        /// Data em que o aluno foi matrículado
        /// </summary>
        public DateTime DataInicio { get; set; } = DateTime.Now;
        /// <summary>
        /// Data em que o aluno foi desativado
        /// </summary>
        public DateTime? DataFim { get; set; } = null;
        /// <summary>
        /// Identificador de ativo ou inativo no banco de dados
        /// </summary>
        public bool Ativo { get; set; } = true;

    }
}