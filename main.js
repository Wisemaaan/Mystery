// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      for (let i = 0; i < this.dna.length; i++) {
        const currentBase = this.dna[i];
        let newBase;

        do {
          newBase = returnRandBase();
        } while (newBase === currentBase);

        this.dna[i] = newBase;
      }
      return this.dna;
    },
  };
};

// Creating an object with random DNA
const specimen = pAequorFactory(1, mockUpStrand());

// Printing original version of DNA
console.log("Original DNA:\n", specimen.dna);

// Calling mutate function
const mutatedDna = specimen.mutate();

// Printing new version of DNA
console.log("Mutated DNA:\n", mutatedDna);







