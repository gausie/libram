import { MafiaClass } from "kolmafia";

const concatTemplateString = (
  literals: TemplateStringsArray,
  ...placeholders: string[]
) =>
  literals.reduce(
    (acc, literal, i) => acc + literal + (placeholders[i] || ""),
    ""
  );

const createSingleConstant = <T extends MafiaClass>(
  Type: typeof MafiaClass & (new () => T)
) => (literals: TemplateStringsArray, ...placeholders: string[]) => {
  const input = concatTemplateString(literals, ...placeholders);
  type I = InstanceType<typeof Type>;
  return Type.get<I>(input);
};

const createPluralConstant = <T extends MafiaClass>(
  Type: typeof MafiaClass & (new () => T)
) => (literals: TemplateStringsArray, ...placeholders: string[]) => {
  const input = concatTemplateString(literals, ...placeholders);

  type I = InstanceType<typeof Type>;

  if (input === "") {
    return Type.all<I>();
  }

  return Type.get<I>(input.split(","));
};

/**
 * A Bounty specified by name.
 */
export const $bounty = createSingleConstant(Bounty);

/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 */
export const $bounties = createPluralConstant(Bounty);

/**
 * A Class specified by name.
 */
export const $class = createSingleConstant(Class);

/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 */
export const $classes = createPluralConstant(Class);

/**
 * A Coinmaster specified by name.
 */
export const $coinmaster = createSingleConstant(Coinmaster);

/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 */
export const $coinmasters = createPluralConstant(Coinmaster);

/**
 * An Effect specified by name.
 */
export const $effect = createSingleConstant(Effect);

/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 */
export const $effects = createPluralConstant(Effect);

/**
 * An Element specified by name.
 */
export const $element = createSingleConstant(Element);

/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 */
export const $elements = createPluralConstant(Element);

/**
 * A Familiar specified by name.
 */
export const $familiar = createSingleConstant(Familiar);

/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 */
export const $familiars = createPluralConstant(Familiar);

/**
 * An Item specified by name.
 */
export const $item = createSingleConstant(Item);

/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 */
export const $items = createPluralConstant(Item);

/**
 * A Location specified by name.
 */
export const $location = createSingleConstant(Location);

/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 */
export const $locations = createPluralConstant(Location);

/**
 * A Monster specified by name.
 */
export const $monster = createSingleConstant(Monster);

/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 */
export const $monsters = createPluralConstant(Monster);

/**
 * A Phylum specified by name.
 */
export const $phylum = createSingleConstant(Phylum);

/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 */
export const $phyla = createPluralConstant(Phylum);

/**
 * A Servant specified by name.
 */
export const $servant = createSingleConstant(Servant);

/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 */
export const $servants = createPluralConstant(Servant);

/**
 * A Skill specified by name.
 */
export const $skill = createSingleConstant(Skill);

/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 */
export const $skills = createPluralConstant(Skill);

/**
 * A Slot specified by name.
 */
export const $slot = createSingleConstant(Slot);

/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 */
export const $slots = createPluralConstant(Slot);

/**
 * A Stat specified by name.
 */
export const $stat = createSingleConstant(Stat);

/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 */
export const $stats = createPluralConstant(Stat);

/**
 * A Thrall specified by name.
 */
export const $thrall = createSingleConstant(Thrall);

/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 */
export const $thralls = createPluralConstant(Thrall);