/*
 Misc functional utility functions, monads, etc. Based on lots of lessons, talks,
 ets from Brian Lonsdorf and others.
 */

//------------------------------------------------------------------------------
// Misc
//------------------------------------------------------------------------------

//const add = uncurry(x => y => x + y);
//http://disq.us/p/16dkkq9
const uncurry = f => (...args) => args.reduce((g, x) => g(x), f);

// if b is false, will return null
const trueOrNull = b => b || null;

//------------------------------------------------------------------------------
// Transducers
//------------------------------------------------------------------------------

export const tconcat   = (acc, x) => acc.concat(x); // Wrap Array.concat
export const tmapper   = (f, cnct) => (acc, x) => cnct(acc, f(x));
export const tfilterer = (f, cnct) => (acc, x) => f(x) ? cnct(acc, x) : acc;

//------------------------------------------------------------------------------
// Either monad
// Implementation from Brian Lonsdorf
//------------------------------------------------------------------------------

export const Right = x =>
  ({
    chain  : f => f(x),
    map    : f => Right(f(x)),
    fold   : (f, g) => g(x),
    concat : o =>
      o.fold(e => Left(e),
        r => Right(x.concat(r))),
    inspect: () => `Right(${x})`
  });

export const Left = x =>
  ({
    chain  : f => Left(x),
    map    : f => Left(x),
    fold   : (f, g) => f(x),
    concat : o => Left(x),
    inspect: () => `Left(${x})`
  });

// Ex showing chain to avoid nested monadic types
// const getPort = () =>
//   tryCatch(() => fs.readFileSync('config.json'))
//   .chain(c => tryCatch(() => JSON.parse(c)))
//   .fold(e => 3000, c => c.port)

export const Either = {
  Left, Right,
  fromNullable: x => x != null ? Right(x) : Left(null), // eslint-disable-line eqeqeq
  fromBool    : x => x ? Right(x) : Left(null),
  fromTryCatch: f => {
    try {
      return Right(f());
    } catch (e) {
      return Left(e);
    }
  }
};

//------------------------------------------------------------------------------
// Other monads
//------------------------------------------------------------------------------

/*
 export const Maybe = x =>
 ({
 x,
 concat: ({x: y}) => Maybe(x + y),
 inspect: () => `Maybe(${x})`,
 of: () => Maybe(x),
 isNothing: () => (x === null || x === undefined),
 map: (f) => {
 if(isNothing()) {
 return Maybe.of(null);
 }
 return Maybe.of(f(x));
 },
 join: () => x,
 chain: (f) => map(f).join,
 orElse: (d) => {
 if(isNothing()) {
 return Maybe.of(d);
 }
 return this;
 },
 ap: (m) => m.map(x)
 });
 */


//------------------------------------------------------------------------------
// Semigroup examples
// CONSIDER USING fantasy-monoids INSTEAD
// https://github.com/fantasyland/fantasy-monoids
// from https://github.com/DrBoolean/spotify-fp-example/blob/master/monoid.js
//------------------------------------------------------------------------------

export const Sum = x =>
  ({
    x,
    concat : ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`
  });

Sum.empty = () => Sum(0);

export const Product = x =>
  ({
    x,
    concat : ({x: y}) => Product(x * y),
    inspect: () => `Product(${x})`
  });

Product.empty = () => Product(1);

export const Any = x =>
  ({
    x,
    concat : ({x: y}) => Any(x || y),
    inspect: () => `Any(${x})`
  });

Any.empty = () => Any(false);

export const All = x =>
  ({
    x,
    concat : ({x: y}) => All(x && y),
    inspect: () => `All(${x})`
  });

All.empty = () => All(true);

export const Max = x =>
  ({
    x,
    concat : ({x: y}) => Max(x > y ? x : y),
    inspect: () => `Max(${x})`
  });

Max.empty = () => Max(-Infinity);

export const Min = x =>
  ({
    x,
    concat : ({x: y}) => Min(x < y ? x : y),
    inspect: () => `Min(${x})`
  });

Min.empty = () => Min(Infinity);

export const Pair = (x, y) =>
  ({
    x,
    y,
    bimap  : (f, g) => Pair(f(x), g(y)),
    toList : () => [x, y],
    concat : ({x: x1, y: y1}) =>
      Pair(x.concat(x1), y.concat(y1)),
    inspect: () => `Pair(${x}, ${y})`
  });

export const Fn = f =>
  ({
    fold   : f,
    concat : o =>
      Fn(x => f(x).concat(o.fold(x))),
    inspect: () => `Fn(${f})`
  });