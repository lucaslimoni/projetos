using SmartSchool.WebAPI.Models;

namespace SmartSchool.WebAPI.Data
{
    public interface IRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        bool SaveChanges();

        //Alunos
        Aluno[] GetAllAlunos(bool includeProfessor = false);
        Aluno[] GetAllAlunosByDisciplinaId(int disciplinaId, bool includeProfessor = false);
        Aluno GetAlunoById(int alunoid, bool includeProfessor = false);
        Aluno[] GetAlunosByNome(string nome, bool includeProfessor = false);
        Aluno[] GetAlunosByNomeSobrenome(string nome, string sobrenome, bool includeProfessor = false);

        //Professores
        Professor[] GetAllProfessores(bool includeAlunos = false);
        Professor[] GetAllProfessoresByDisciplinaId(int disciplinaId, bool includeAlunos = false);
        Professor[] GetProfessorByNome(string nome, bool includeAlunos = false);
        Professor GetProfessorById(int professorId, bool includeAlunos = false);
    }
}