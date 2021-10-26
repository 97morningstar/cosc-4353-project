
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Flood.Controllers
{
    [RoutePrefix("api")]
    public class FloodController : ApiController
    {
        [Route("all-locations")]
        public IEnumerable<Location> GetAllMarkerPoints()
        {
            using (FloodDBEntities entities = new FloodDBEntities())
            {
                return entities.Locations.ToList();
            }
        }

        [Route("user-locations/{userId:Guid}")]
        public IEnumerable<Location> GetMarkerPointsById(Guid userId)
        {
            using (FloodDBEntities entities = new FloodDBEntities())
            {
                return entities.Locations.ToList().Where(e => e.UserID == userId);
            }
        }

        [Route("severity/{severity:int}")]
        public IEnumerable<Location> GetMarkerPointsBySeverity(int severity)
        {
            using (FloodDBEntities entities = new FloodDBEntities())
            {
                return entities.Locations.ToList().Where(e => e.Severity == severity);
            }
        }

        [Route("date-range/{startDate:DateTime}/{endDate:DateTime}")]
        public IEnumerable<Location> GetMarkerPointsInRange(DateTime startDate, DateTime endDate)
        {
            using (FloodDBEntities entities = new FloodDBEntities())
            {
                return entities.Locations.ToList().Where(e => e.CreatedOn > startDate && e.CreatedOn < endDate);
            }
        }
    }
}
