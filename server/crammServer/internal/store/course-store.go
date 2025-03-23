package store

import "crammServer/model"

var Test = model.Course{
	Subjects:   []string{"sample"},
	CourseName: "Test",
}

var NEET = model.Course{
	Subjects:   []string{"neetPhysics", "neetChemistry", "neetBiology"},
	CourseName: "NEET",
}

var CoursesMap = map[string]model.Course{
	"test": Test,
	"neet": NEET,
}
