// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
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
    compareDNA(otherSpecimen) {
      let sequence_counter = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherSpecimen.dna[i]) {
          sequence_counter++;
        }
      }
      const percentage = (sequence_counter / this.dna.length) * 100;

      console.log(
        `Specimen #${this.specimenNum} and Specimen #${otherSpecimen.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`
      );
    },
    willLikelySurvive() {
      let bases_counter = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          bases_counter++;
        }
      }

      const percentage = (bases_counter / this.dna.length) * 100;

      return percentage >= 60;
    },
    complementStrand() {
      let compatible_strand = [];

      for (let i = 0; i < this.dna.length; i++) {
        const base = this.dna[i];

        if (base === 'A') {
          compatible_strand.push('T');
        } else if (base === 'T') {
          compatible_strand.push('A');
        } else if (base === 'C') {
          compatible_strand.push('G');
        } else if (base === 'G') {
          compatible_strand.push('C');
        }
      }

      return compatible_strand;
    }
  };
};

const samplesBase = [];

for (let i = 3; i <= 32; i++) {
  const newSamples = pAequorFactory(i, mockUpStrand());
  samplesBase.push(newSamples);
}

// Creating an object with random DNA
const specimen = pAequorFactory(1, mockUpStrand());
console.log("Original DNA:\n", specimen.dna.join('') + "\n");

// Calling mutate function
const mutatedDna = specimen.mutate();
console.log("Mutated DNA:\n", mutatedDna.join('') + "\n");

const specimen2 = pAequorFactory(2, mockUpStrand());
console.log("Specimen 1 DNA:\n", specimen.dna.join('') + "\n");
console.log("Specimen 2 DNA:\n", specimen2.dna.join('') + "\n");

// Comparing DNA between two specimens
specimen.compareDNA(specimen2);

// Check if specimens will likely survive
console.log("Will specimen 1 likely survive?\n", specimen.willLikelySurvive() + "\n");
console.log("Will specimen 2 likely survive?\n", specimen2.willLikelySurvive() + "\n");

// Complementary strand
console.log("Specimen 1 Complementary Strand:\n", specimen.complementStrand().join('') + "\n");
