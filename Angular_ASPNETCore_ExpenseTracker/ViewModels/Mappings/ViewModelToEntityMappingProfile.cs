
using AutoMapper;
using ETS.DomainCore.Model;

namespace Angular_ASPNETCore_ExpenseTracker.ViewModels.Mappings
{
    public class ViewModelToEntityMappingProfile : Profile
    {
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<RegistrationViewModel, ApplicationUser>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.UserName));
            CreateMap<RegistrationViewModel, ApplicationUser>().ForMember(au => au.Email, map => map.MapFrom(vm => vm.UserName));
        }
    }
}
