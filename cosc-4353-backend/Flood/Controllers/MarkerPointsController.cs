using Flood.Models;
using FloodDataAccess.FloodModel;
using FloodDataAccess.MarkerPointsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Web.Http;
using System.Web.Http.Results;

namespace Flood.Controllers
{
    [RoutePrefix("api")]
    public class MarkerPointsController : ApiController
    {
        [HttpGet]
        [Route("all-locations")]
        public IEnumerable<MarkerPoint> GetAllMarkerPoints()
        {
            using (FloodDBEntities1 entities = new FloodDBEntities1())
            {
                return entities.MarkerPoints.ToList();
            }
        }

        [HttpGet]
        [Route("user-locations/{userId:Guid}")]
        public IEnumerable<MarkerPoint> GetMarkerPointsById(Guid userId)
        {
            using (FloodDBEntities1 entities = new FloodDBEntities1())
            {
                return entities.MarkerPoints.ToList().Where(e => e.UserID == userId);
            }
        }

        [HttpGet]
        [Route("severity/{severity:int}")]
        public IEnumerable<MarkerPoint> GetMarkerPointsBySeverity(int severity)
        {
            using (FloodDBEntities1 entities = new FloodDBEntities1())
            {
                return entities.MarkerPoints.ToList().Where(e => e.Severity == severity);
            }
        }

        [HttpGet]
        [Route("date-range/{startDate:DateTime}/{endDate:DateTime}")]
        public IEnumerable<MarkerPoint> GetMarkerPointsInRange(DateTime startDate, DateTime endDate)
        {
            using (FloodDBEntities1 entities = new FloodDBEntities1())
            {
                return entities.MarkerPoints.ToList().Where(e => e.CreatedOn > startDate && e.CreatedOn < endDate);
            }
        }

        [HttpPost]
        [Route("map")]
        public IHttpActionResult InsertMarkerPoint([FromBody] InsertMarkerModel jsondata /*Guid userId, DateTime ceatedOn, DateTime expiration, Decimal latitude, Decimal longitude,*/ )
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid Model.");
            using (FloodDBEntities1 entities = new FloodDBEntities1())
            {
                var locationData = new MarkerPoint
                {
                    UserID = Guid.Parse(jsondata.userId),
                    CreatedOn = DateTime.UtcNow,
                    Expiration = DateTime.UtcNow.AddDays(30),
                    Latitude = jsondata.latitude,
                    Longitude = jsondata.longitude,
                    Description = jsondata.description,
                    Severity = jsondata.severity,
                    UrlImage = jsondata.urlImage
                };
                entities.MarkerPoints.Add(locationData);
                entities.SaveChanges();
            }
            return Ok();
        }
        
        [HttpPut]
        [Route("update-point")]
        public IHttpActionResult UpdateMarkerPoint([FromBody] InsertMarkerModel jsondata) //we might only need the marker_id
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid Model.");
            using (FloodDBEntities1 entities = new FloodDBEntities1())
            {
                var existingPoint = entities.MarkerPoints.Where(p => p.Id == jsondata.Id).FirstOrDefault();
                /*var existingUser = entities.MarkerPoints.Where(s => s.UserID == Guid.Parse(jsondata.userId)).FirstOrDefault();
                if (existingUser == null)
                    return BadRequest("User Does Not Exist.");*/
                if (existingPoint == null)
                    return BadRequest("Marker Point Does Not Exist.");

                existingPoint.CreatedOn = DateTime.UtcNow;
                existingPoint.Expiration = DateTime.UtcNow.AddDays(30);
                existingPoint.Latitude = jsondata.latitude;
                existingPoint.Longitude = jsondata.longitude;
                existingPoint.Description = jsondata.description ?? existingPoint.Description;
                existingPoint.Severity = jsondata.severity ?? existingPoint.Severity;
                existingPoint.UrlImage = jsondata.urlImage ?? existingPoint.UrlImage;

                entities.SaveChanges();
            }
            return Ok();
        }
        //in order to update marker, client would have to know marker_id. 
        //create delete function
        [HttpDelete]
        [Route("delete-point")] 
        public IHttpActionResult DeleteMarkerPoint([FromBody]int id)
        {
            if (id <= 0)
                return BadRequest("Invalid Marker Point ID.");
            using (FloodDBEntities1 entities = new FloodDBEntities1())
            {
                var point = entities.MarkerPoints.Where(p => p.Id == id).FirstOrDefault();

                entities.Entry(point).State = System.Data.Entity.EntityState.Deleted;
                entities.SaveChanges();
            }
            return Ok();
        }
    }
}
