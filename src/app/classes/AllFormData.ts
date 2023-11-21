 export class AllCategoryForm{
 patientId: string
 district: string
 facility: string
 category: string
 referenceId: string
 createdDate: Date
 createdBy: string
 updatedDate: string
 userId: string
/*History*/

 deliveryType: string
 cryAfterBirth: string
 histroyAdmIllness: string
 historyFamily: string
 familyHistoryIfYes: string
 immunStatus: string
 historyFeeding: string
 contactWithTB: string
 historyDeworming: string

 sittingWithoutSupport: string
 standingWithoutSupport: string
 standingWithSupport: string
 pincerGrasp: string
 strangerAnxiety: string
 bisyllSpeech: string
 walkWithoutSupport: string
 speakFiveToTenWords: string
 followSimpleDirections: string
 walkStairsWithSupport: string
 jumpWithBothFeets: string
 scrabbling: string
 speakAtleastFiftyWords: string
 neckHolding: string
 socialSmile: string
 sittingWithSupport: string


/*General examination*/

 weight: string
 height: string
 headCircum: string
 midArmCircum: string
 oxygenSaturation: string
 pallor: string
 jaundice: string
 cyanosis: string
 heartRate: string
 respiratoryRate: string
 pedalOedema: string
 congenitalAnomalies: string
 anteriorFontanelle: string
 hairTexture: string
 skinTexture: string
 skinTurgor: string
 skinLesions: string
 bmi: string
 pulseRate: string
 bloodPressure: string
 wristWidening: string
 vitADeficiency: string
 gonadalExamination: string
 earDischarge: string
 speech: string
 iq: string
 jaundiceCyanosis: string
 clubbing: string
 lymphadenopathy: string
 cappillaryRefillTime: string


/*Systemic Examination*/

 chest: string
 cvs: string
 perAbdomen: string
 cns: string
 hearing: string
 rightEye: string
 leftEye: string
 colorVision: string
 dentalExaminationAbnormality: string
 genitalExamination: string
 breastExamination: string
 jointExamination: string
 oralExamination: string
 eyeCongenital: string
 movementOfEyeBallWithLight: string



/*mandatory Examination*/

 hb: string
 relevantInvestigation: string
 tlc: string
 neutrophils: string
 lymphocytes: string
 monocytes: string
 eosinophils: string
 basophils: string
 packedCellVolume: string
 meanCorpusVolume: string
 meanCorpusHemoglobin: string
 meanCorpusHemoglobinConcentration: string
 platletCount: string
 rdwCv: string
 rdwSd: string
 rbcCount: string
 rbs: string
 urineRoutineExamination: string
 serumCholestrol: string
 bloodUrea: string
 serumCreatinine: string
 rft: string
 tsh: string
 psaForMales: string
 papSmear: string

/* diagnosis*/

 diagnosed: string
 alreadyKnown: string
 prescription: string

//ordered mandatory investigations
 hbChecks: string
 relevantInvestigationChecks: string
 rbsChecks: string
 urineRoutineExamChecks: string
 serumCholesterolChecks: string
 rftChecks: string
 tshChecks: string
 psaChecks: string
 rdwCvChecks: string
 tlcChecks: string
 neutrophilsChecks: string
 lymphocytesChecks: string
 monocytesChecks: string
 eosinophilsChecks: string
 basophilsChecks: string
 packedCellVolumeChecks: string
 meanCorpuscularVolumeChecks: string
 meanCorpuscularHemoglobinChecks: string
 meanCorpuscularHemoglobinConcentrationChecks: string
 pleteletChecks: string
 rdwSdChecks: string
 rbcChecks: string
 bloodUreaChecks: string
 serumCreatinineChecks: string
 papSmaearChecks: string

 //reason for refer
 nHProgValue:string
 reasonForRefer:string
}