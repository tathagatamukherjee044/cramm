package store

import "crammServer/model"

var School = model.Course{
	Subjects: []string{"english", "maths"},
}

var College = model.Course{
	Subjects: []string{"fax", "weed"},
}

var Test = model.Course{
	Subjects: []string{"sample"},
}

var NEET = model.Course{
	Subjects: []string{"neetPhysics", "neetChemistry", "neetBiology"},
}

var CoursesMap = map[string]model.Course{
	"college": College,
	"school":  School,
	"test":    Test,
	"neet":    NEET,
}
