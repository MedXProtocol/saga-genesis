# Introduction

This module separates asynchronous calls from your components using sagas.  When certain properties on a component change, the saga is run.

This module offers additional sagas and reducers to provide Web3 caching functionality.

## Modules

### `account`

The `account` module polls the current web3 accounts and puts them in the global state.

### `block`

The `block` module listens for new blocks and invalidates addresses that were affected.

### `cache-scope`

The `cache-scope` provides tooling to track the number of web3 calls currently active.  The calls are associated
with a key and can be cleared by 'deregistering' the key.

### `call-cache`

The `call-cache` module allows the user to make web3 calls that are cached.  The calls are only cached within
a single page.

# Project Ideals

1. Only Plain Old JavaScript Objects live in the state.  Web3 contracts should not live in the state.

# TODO

- [x] Put contract registry into the state with sagas.  The contract registry needs to store the contract ABI.
- [x] Create contract accessor like cacheCallValue and move all of them into a 'finders' module
- [ ] fix caching
- [ ] Store state as of last known transaction block.

# Ideas

Really, we want the state of the contracts.  How much data is in the contracts?

Say 1 million records, each has 6 32 byte pieces of data.

6 * 32 * 1 million = 192 million bytes = 187 mb

How can we split up that data predictably so that data is cached?

The Redux state caches the data locally.  The state forms a branched tree, and portions of it could be divided.

Some of those divisions could be matched to a block number.

## IPFS usage

Ideally browsers could track their latest IPFS hash and block number.  If the entire state is locked to a block number
and the blocks are where the state changes.

Instead of calling cacheCall 10x the browser could simply load the IPFS json file.

The browser could first try loading the JSON from IPFS, otherwise just setup the state normally.

To encourage cache collisions between browsers, it would be good to scope the data to useful bundles.

function* retrievePureContractState(blah, bloh) {
  // Comprised of a set of web3 cacheCalls to retrieve data.
  // Each web3 call is tied to a certain block.
  // The saga produces JSON.
  // The saga should be idempotent for it's parameters.
}

**OOP**

1. A component saga can request pure contract state.  It will be tied to the last modifying block.

```javascript

function* saga({ caseAddress }) {
  const kase = yield buildCase({ caseAddress })
}

```

`buildCase()` is a function that only makes calls to web3:

1. It first checks to see if a valid IPFS hash for the signature `sha3(buildCase + caseAddress + blockNumber)`

3. It does not find a valid IPFS object, so it makes the set of calls to produce a JSON object.

3. The resulting JSON is stored in IPFS and the hash is stored locally.

4. Subsequent calls to `buildCase` will first search for an IPFS copy, otherwise build a new one.

*Problems*

- The browser still has to build the objects in order to find them.  Oh well.  It will only do that once (or
  at least every cookie reset)

- Bandwidth.  Now the browser is writing out as well as reading in.
