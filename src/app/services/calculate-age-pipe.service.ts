import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'calculateAge'
})
export class CalculateAgePipeService implements PipeTransform{

  transform(date_of_birth: string): string {
    if (!date_of_birth) return ''; // Handle cases where date of birth is not provided

    console.log(date_of_birth)
    const parts = date_of_birth.split('-');
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const dob = new Date(formattedDate);
    console.log("dob "+dob)
    const today = new Date();
    console.log("today "+today)
    const age = today.getFullYear() - dob.getFullYear();
    console.log(today.getFullYear())
    console.log(dob.getFullYear())

    console.log(age)
    // Adjust age based on month and day
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      return (age - 1).toString();
    }

    if(age<=0){
      return "0";
    }
    return age.toString();
  }

  // transform(dateOfBirth: string): string {
  //   if (!dateOfBirth) return ''; // Handle cases where date of birth is not provided
  
  //   const parts = dateOfBirth.split('-');
  //   const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  //   const dob = new Date(formattedDate);
  //   const today = new Date();
  
  //   let years = today.getFullYear() - dob.getFullYear();
  //   let months = today.getMonth() - dob.getMonth();
  
  //   // Adjust age based on month and day
  //   if (today.getDate() < dob.getDate()) {
  //     months--;
  //   }
  
  //   // If the birthdate hasn't occurred yet this year
  //   if (months < 0) {
  //     years--;
  //     months += 12;
  //   }
  
  //   // Format the result as "X years and Y months"
  //   let result = `${years} ${years === 1 ? 'year' : 'years'}`;
  //   if (months > 0) {
  //     result += ` and ${months} ${months === 1 ? 'month' : 'months'}`;
  //   }
  
  //   return result;
  // }
  
}
