export default function getNumberOfBots(botPlan = 'plan-gratuit', userBudget) {
    let unitPrice;
  
    switch (botPlan) {
      case "plan-gratuit":
        unitPrice = 0;
        break;
      case "plan-business":
        unitPrice = 50;
        break;
      case "plan-partenaire":
        unitPrice = 100;
        break;
      default:
        console.log("unkown plan");
        break;
    }
  
    return userBudget > 0 ? Math.floor(userBudget / unitPrice).toLocaleString("fr-FR") : 0;
  }