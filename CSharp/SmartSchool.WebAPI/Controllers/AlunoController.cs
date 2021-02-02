using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SmartSchool.WebAPI.Models;
using System.Linq;
using SmartSchool.WebAPI.Data;
using Microsoft.EntityFrameworkCore;
using SmartSchool.WebAPI.Dtos;
using AutoMapper;

namespace SmartSchool.WebAPI.Controllers
{
    /// <summary>
    /// Controllers responsavel pelo Aluno
    /// </summary>
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class AlunoController : ControllerBase
    {
        public readonly IRepository _repo;
        private readonly IMapper _mapper;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="repo"></param>
        /// <param name="mapper"></param>
        public AlunoController(IRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        /// <summary>
        /// Método responsável por retornar todos os alunos
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            var alunos = _repo.GetAllAlunos(true);

            return Ok(_mapper.Map<IEnumerable<AlunoDto>>(alunos));
        }

        /// <summary>
        /// Método responsável por retornar apenas um unico Aluno por ID.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        //api/aluno/id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var aluno = _repo.GetAlunoById(id);
            if (aluno == null) return BadRequest("Aluno não encontrado");

            var alunoDto = _mapper.Map<AlunoDto>(aluno);
            return Ok(alunoDto);
        }


        /// <summary>
        /// Método responsável por retornar todos os alunos buscando por letra.
        /// </summary>
        /// <param name="nome"></param>
        /// <returns></returns>

        //api/aluno/nome
        [HttpGet("byNome")]
        public IActionResult GetByName(string nome)
        {
            if (nome == null) return BadRequest("Nome não pode ser nulo para busca");
            var aluno = _repo.GetAlunosByNome(nome, true);
            if (aluno == null) return BadRequest("Aluno não encontrado");
            var alunoDto = _mapper.Map<IEnumerable<AlunoDto>>(aluno);
            return Ok(alunoDto);
        }

        /// <summary>
        /// Método responsável por retornar um unico aluno buscando por nome e sobrenome.
        /// </summary>
        /// <param name="nome"></param>
        /// <param name="sobrenome"></param>
        /// <returns></returns>

        //api/aluno/nome
        [HttpGet("byNomeSobrenome")]
        public IActionResult GetByName(string nome, string sobrenome)
        {
            if (nome == null) return BadRequest("Nome não pode ser nulo para busca");
            if (sobrenome == null) return BadRequest("Sobrenome não pode ser nulo para busca");
            var aluno = _repo.GetAlunosByNomeSobrenome(nome, sobrenome, true);
            if (aluno == null) return BadRequest("Aluno não encontrado");
            var alunoDto = _mapper.Map<IEnumerable<AlunoDto>>(aluno);
            return Ok(alunoDto);
        }

        /// <summary>
        /// Método responsável por gravar um aluno.
        /// </summary>
        /// <returns></returns>

        //api/aluno/nome
        [HttpPost]
        public IActionResult Post(AlunoRegistrarDto model)
        {
            var aluno = _mapper.Map<Aluno>(model);
            _repo.Add(aluno);
            if (_repo.SaveChanges())
            {
                return Created($"/api/aluno/{model.Id}", _mapper.Map<AlunoDto>(aluno));
            }
            return BadRequest("Aluno não cadastrado");
        }

        /// <summary>
        /// Método responsável por alterar um aluno por id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>

        //api/aluno/nome
        [HttpPut("{id}")]
        public IActionResult Put(int id, AlunoRegistrarDto model)
        {
            var aluno = _repo.GetAlunoById(id);
            if (aluno == null) return BadRequest("Aluno não encontrado");
            _mapper.Map(model, aluno);

            _repo.Update(aluno);
            if (_repo.SaveChanges())
            {
                return Created($"/api/aluno/{model.Id}", _mapper.Map<AlunoDto>(aluno));
            }
            return BadRequest("Aluno não atualizado");
        }

        /// <summary>
        /// Método responsável por alterar um aluno por id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>

        //api/aluno/nome
        [HttpPatch("{id}")]
        public IActionResult Patch(int id, AlunoRegistrarDto model)
        {
            var aluno = _repo.GetAlunoById(id);
            if (aluno == null) return BadRequest("Aluno não encontrado");

            _mapper.Map(model, aluno);
            _repo.Update(aluno);
            if (_repo.SaveChanges())
            {
                return Created($"/api/aluno/{model.Id}", _mapper.Map<AlunoDto>(aluno));
            }
            return BadRequest("Aluno não atualizado");
        }

        /// <summary>
        /// Método responsável por deletar um aluno por id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        //api/aluno/nome
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var aluno = _repo.GetAlunoById(id);
            if (aluno == null) return BadRequest("Aluno não encontrado");
            _repo.Delete(aluno);
            if (_repo.SaveChanges())
            {

                return Ok("Aluno deletado com sucesso");
            }
            return BadRequest("Aluno não deletado");
        }
    }
}