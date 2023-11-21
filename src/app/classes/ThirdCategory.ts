export class ThirdCategory{
      
    patientId:string
	district:string
	facility:string
	createdDate:Date
	createdBy:string
	category:string
	userId:string
	/*history*/
	
	histroyAdmIllness:string
	historyFamily:string
	immunStatus:string
	contactWithTB:string
	historyDeworming:string
	
	/*general*/
	
	weight:number
	height:number
	bmi:string
	pallor:string
	jaundice:string
	cyanosis:string
	pulseRate:number
	bloodPressure:string
	respiratoryRate:number
	pedalOedema:string
	congenitalAnomalies:string
	wristWidening:string
	vitADeficiency:string
	gonadalExamination:string
	earDischarge:string
	speech:string
	iq:string
	skinTurgor:string
	skinLesions:string
	
	/*systemic*/
	
	chest:string
	cvs:string
	perAbdomen:string
	cns:string
	hearing:string
	rightEye:string
	leftEye:string
	colorVision:string
	genitalExamination:string
	dentalExam:string
	
	/*mandate*/
	
	hb:string
	tlc:string
	neutrophils:string
    lymphocytes:string
    monocytes:string
    eosinophils:string
    basophils:string
    packedCellVolume:string
    meanCorpusVolume:string
    meanCorpusHemoglobin:string
    meanCorpusHemoglobinConcentration:string
    platletCount:string
    rdwCv:string
    rdwSd:string
    rbcCount:string
    rbs:string
	urineRoutineExamination:string
	relevantInvestigation:string

	//diagnosis

	diagnosed:string
	alreadyKnown:string

	//prescription
	prescription:string
}