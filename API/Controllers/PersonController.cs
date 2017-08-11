using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TestApi1.Models;

namespace TestApi1.Controllers
{
    public class PersonController : ApiController
    {
        readonly IList<Person> personList = new List<Person>()
        {
            new Person()
                {
                    FirstName = "Andy", LastName = "Creane", JobTitle = "Manager"
                },
            new Person()
                {
                    FirstName = "Lisa", LastName = "Williams", JobTitle = "Chemist"
                },
        };

        //// GET api/<controller>
        public IList<Person> GetAllPersons()
        {
            //Return list of all personLists
            return personList;
        }

        [HttpPut]
        public Person PutPerson([FromUri] Person value)
        {
            var person = personList.FirstOrDefault();
            person.FirstName = value.FirstName;
            person.LastName = value.LastName;
            person.JobTitle = value.JobTitle;
            return person;
        }

    }
}