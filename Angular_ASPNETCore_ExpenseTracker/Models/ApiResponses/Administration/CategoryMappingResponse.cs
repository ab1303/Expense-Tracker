using ETS.Services.DTO;
using System.Collections.Generic;

namespace Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses
{
    public class CategoryMappingResponse : BaseApiResponse
    {
        /// <summary>
        /// List of cities in a country
        /// </summary>
        public IEnumerable<CategoryMappingDTO> CategoryMappings { get; set; }
    }
}
