import {
  abort,
  cliExecute,
  getFuel,
  haveEffect,
  historicalPrice,
  isNpcItem,
  mallPrice,
  retrieveItem,
  toInt,
  visitUrl,
} from "kolmafia";
import { getAverageAdventures } from "../../lib";
import { $effect, $items } from "../../template-string";

const fuelSkiplist = $items`cup of "tea", thermos of "whiskey", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of "milk"`;

function price(item: Item) {
  return historicalPrice(item) === 0 ? mallPrice(item) : historicalPrice(item);
}

function calculateFuelEfficiency(it: Item, targetUnits: number): number {
  const units = getAverageAdventures(it);
  return price(it) / Math.min(targetUnits, units);
}

function isFuelItem(it: Item) {
  return (
    !isNpcItem(it) &&
    it.fullness + it.inebriety > 0 &&
    getAverageAdventures(it) > 0 &&
    it.tradeable &&
    it.discardable &&
    !fuelSkiplist.includes(it)
  );
}

const potentialFuel = $items``.filter(isFuelItem);

function getBestFuel(targetUnits: number): Item {
  const key1 = (item: Item) => -getAverageAdventures(item);
  const key2 = (item: Item) => calculateFuelEfficiency(item, targetUnits);
  potentialFuel.sort((x: Item, y: Item) => key1(x) - key1(y));
  potentialFuel.sort((x: Item, y: Item) => key2(x) - key2(y));

  return potentialFuel[0];
}

function insertFuel(it: Item, quantity = 1): boolean {
  const result = visitUrl(
    `campground.php?action=fuelconvertor&pwd&qty=${quantity}&iid=${toInt(
      it
    )}&go=Convert%21`
  );
  return result.includes("The display updates with a");
}

export function fillTo(targetUnits: number): boolean {
  while (getFuel() < targetUnits) {
    const remaining = targetUnits - getFuel();

    const fuel = getBestFuel(remaining);
    const count = Math.ceil(targetUnits / getAverageAdventures(fuel));

    retrieveItem(count, fuel);

    if (!insertFuel(fuel, count)) {
      abort("Fuelling failed");
    }
  }
  return getFuel() >= targetUnits;
}

export const Driving = {
  Obnoxiously: $effect`Driving Obnoxiously`,
  Stealthily: $effect`Driving Stealthily`,
  Wastefully: $effect`Driving Wastefully`,
  Safely: $effect`Driving Safely`,
  Recklessly: $effect`Driving Recklessly`,
  Intimidatingly: $effect`Driving Intimidatingly`,
  Quickly: $effect`Driving Quickly`,
  Observantly: $effect`Driving Observantly`,
  Waterproofly: $effect`Driving Waterproofly`,
};

export function drive(style: Effect, turns = 1): boolean {
  if (!Object.values(Driving).includes(style)) return false;

  if (haveEffect(style) >= turns) return true;

  const fuelNeeded = (37 * (turns - haveEffect(style))) / 30;
  fillTo(fuelNeeded);
  while (getFuel() >= 37 && haveEffect(style) < turns) {
    cliExecute(`asdonmartin drive ${style.name.replace("Driving ", "")}`);
  }
  return haveEffect(style) >= turns;
}
