export function normalizeSalary(employee:any){

  const salary = Number(employee.annual_base_salary || 0);

  const fte = Number(employee.fte_percent || 100);

  if(!fte || fte <= 0){
    return 0;
  }

  return salary / (fte / 100);
}


export function getMean(employees:any[]){

  if(!employees.length){
    return 0;
  }

  const salaries = employees.map(normalizeSalary);

  return (
    salaries.reduce(
      (sum,salary)=>sum + salary,
      0
    ) / salaries.length
  );

}


export function getMedian(employees:any[]){

  if(!employees.length){
    return 0;
  }

  const salaries = employees
    .map(normalizeSalary)
    .sort((a,b)=>a-b);


  const middle =
    Math.floor(salaries.length/2);


  if(salaries.length % 2 === 1){
    return salaries[middle];
  }


  return (
    salaries[middle-1] +
    salaries[middle]
  ) / 2;

}


export function calculateGap(
  male:number,
  female:number
){

  if(!male || !female){
    return null;
  }


  return (
    ((male-female)/male)*100
  );

}