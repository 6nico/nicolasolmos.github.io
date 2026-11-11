export type EarningsInput = {games:number;visitsPerGame:number;uniqueShare:number;buyerRate:number;purchasesPerBuyer:number;priceRobux:number;creatorShare:number;devExRate:number;costsUSD:number};
export function earnings(x:EarningsInput){
 const visits=Math.max(0,x.games*x.visitsPerGame);
 const people=Math.floor(visits*Math.max(0,Math.min(1,x.uniqueShare)));
 const buyers=Math.floor(people*Math.max(0,Math.min(1,x.buyerRate)));
 const spent=buyers*x.purchasesPerBuyer*x.priceRobux;
 const earned=Math.floor(spent*x.creatorShare);
 const possibleUSD=Number((earned*x.devExRate).toFixed(2));
 return {visits,people,buyers,spent,earned,possibleUSD,balance:Number((possibleUSD-x.costsUSD).toFixed(2))};
}
export function capacity(uploadIndex:number,effort:number,utilization:number){const value=uploadIndex*effort/utilization;return {value,change:(value/125-1)*100};}
