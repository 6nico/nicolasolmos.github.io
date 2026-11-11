import {describe,it,expect} from 'vitest';
import {earnings,capacity} from './calculations';
describe('transparent scenario math',()=>{
 it('matches the documented example',()=>{const x=earnings({games:3,visitsPerGame:100000/3,uniqueShare:.5,buyerRate:.02,purchasesPerBuyer:1,priceRobux:100,creatorShare:.7,devExRate:.0038,costsUSD:300});expect(x.buyers).toBe(1000);expect(x.earned).toBe(70000);expect(x.possibleUSD).toBe(266);expect(x.balance).toBe(-34)});
 it('zero visits means zero revenue',()=>{expect(earnings({games:0,visitsPerGame:200,uniqueShare:1,buyerRate:.3,purchasesPerBuyer:1,priceRobux:100,creatorShare:.7,devExRate:.0038,costsUSD:10}).possibleUSD).toBe(0)});
 it('capacity baseline is 125',()=>expect(capacity(100,1,.8).value).toBe(125));
});
