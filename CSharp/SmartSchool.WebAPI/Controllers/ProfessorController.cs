using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartSchool.WebAPI.Data;
using SmartSchool.WebAPI.Dtos;
using SmartSchool.WebAPI.Models;

namespace SmartSchool.WebAPI.Controllers
{
    /// <summary>
    /// Controllers responsavel pelo Professor
    /// </summary>
    [ApiController]
    [ApiVersion("2.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ProfessorController : ControllerBase
    {
        private readonly IMapper _mapper;

        public readonly IRepository _repo;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="repo"></param>
        /// <param name="mapper"></param>
        public ProfessorController(IRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        /// <summary>
        /// Método responsável por retornar todos os Professores
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        public IActionResult Get()
        {
            var prof = _repo.GetAllProfessores(true);
            return Ok(_mapper.Map<IEnumerable<ProfessorDto>>(prof));
        }
        /// <summary>
        /// Método responsável por retornar apenas um unico Professor por ID.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        //api/professor/id
        [HttpGet("ById")]
        public IActionResult GetById(int id)
        {
            var professor = _repo.GetProfessorById(id, true);
            if (professor == null) return BadRequest("Professor não encontrado");
            var professorDto = _mapper.Map<ProfessorDto>(professor);

            return Ok(professorDto);
        }

        /// <summary>
        /// Método responsável por retornar todos os professores buscando por letra.
        /// </summary>
        /// <param name="nome"></param>
        /// <returns></returns>

        [HttpGet("ByNome")]
        public IActionResult GetByNome(string nome)
        {
            var professor = _repo.GetProfessorByNome(nome, true);
            if (professor.Count() == 0) return BadRequest("Nenhum professor encontrado");

            var professorDto = _mapper.Map<IEnumerable<ProfessorDto>>(professor);

            return Ok(professorDto);
        }


        /// <summary>
        /// Método responsável por gravar um Professor.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post(ProfessorRegistrarDto model)
        {
            var professor = _mapper.Map<Professor>(model);
            _repo.Add(professor);
            if (_repo.SaveChanges())
            {
                return Created($"/api/aluno/{model.Id}", _mapper.Map<ProfessorDto>(professor));
            }
            return BadRequest("Professor não cadastrado");
        }


        /// <summary>
        /// Método responsável por alterar um Professor por id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public IActionResult Put(int id, ProfessorRegistrarDto model)
        {
            var professor = _repo.GetProfessorById(id, false);
            if (professor == null) return BadRequest("Professor não encontrado");

            _mapper.Map(model, professor);
            _repo.Update(professor);
            if (_repo.SaveChanges())
            {
                return Created($"/api/aluno/{model.Id}", _mapper.Map<ProfessorDto>(professor));
            }
            return BadRequest("Professor não alterado");
        }


        /// <summary>
        /// Método responsável por alterar um Professor por id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPatch("{id}")]
        public IActionResult Patch(int id, ProfessorRegistrarDto model)
        {
            var professor = _repo.GetProfessorById(id, false);
            if (professor == null) return BadRequest("Professor não encontrado");

            _mapper.Map(model, professor);
            _repo.Update(professor);
            if (_repo.SaveChanges())
            {
                return Created($"/api/aluno/{model.Id}", _mapper.Map<ProfessorDto>(professor));
            }
            return BadRequest("Professor não alterado");
        }


        /// <summary>
        /// Método responsável por deletar um Professor por id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var prof = _repo.GetProfessorById(id, true);
            if (prof == null) return BadRequest("Professor não encontrado");

            _repo.Delete(prof);
            if (_repo.SaveChanges())
            {
                return Ok("Professor deletado com sucesso");
            }
            return BadRequest("Professor não deletado");
        }
    }
}