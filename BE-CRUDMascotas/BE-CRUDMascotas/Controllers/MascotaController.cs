using AutoMapper;
using BE_CRUDMascotas.Models;
using BE_CRUDMascotas.Models.DTO;
using BE_CRUDMascotas.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMascotaRepository _mascotaRepository;

        public MascotaController(IMapper mapper, IMascotaRepository mascotaRepository)
        {
            _mapper = mapper;
            _mascotaRepository = mascotaRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listMascotas = await _mascotaRepository.GetListMascotas();

                var listMascotasDTO = _mapper.Map<IEnumerable <MascotaDTO>>(listMascotas);

                return Ok(listMascotasDTO);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var mascota = await _mascotaRepository.GetMascota(id);
                if (mascota == null)
                {
                    return NotFound();
                }

                var mascotaDto = _mapper.Map<MascotaDTO>(mascota);

                return Ok(mascotaDto);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var mascota = await _mascotaRepository.GetMascota(id);
                if (mascota != null)
                {
                    await _mascotaRepository.DeleteMascota(mascota);
                }
                return NoContent();
            }catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(MascotaDTO mascotaDto)
        {
            try
            {
                var mascota = _mapper.Map<Mascota>(mascotaDto);

                mascota.FechaCreacion = DateTime.Now;

                mascota = await _mascotaRepository.AddMascota(mascota);

                var mascotaItemDto = _mapper.Map<MascotaDTO>(mascota);

                // Cuando añadimos un nuevo objeto: nos devuelve el objeto que acabamos de crear en forma de url
                return CreatedAtAction("Get", new { id = mascotaItemDto.Id }, mascotaItemDto);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, MascotaDTO mascotaDto)
        {
            try {

                // Hacemos el mapeo
                var mascota = _mapper.Map<Mascota>(mascotaDto);

                if (id != mascota.Id)
                {
                    return BadRequest();
                }
                // _context.Update(mascota); -- Solo si modificamos el objeto entero

                // Buscamos la empresa: si no lo encuentra, NotFound
                var mascotaItem = await _mascotaRepository.GetMascota(id);
                if (mascotaItem == null)
                {
                    return NotFound();
                }

                // Actualizamos 
                await _mascotaRepository.UpdateMascota(mascota);

                return NoContent();
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
