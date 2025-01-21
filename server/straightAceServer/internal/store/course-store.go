package store

import "StraightAceServer/model"

var School = model.Course{
	Subjects: []string{"english", "maths"},
}

var College = model.Course{
	Subjects: []string{"fax", "weed"},
}

var Test = model.Course{
	Subjects: []string{"maths"},
}

var CoursesMap = map[string]model.Course{
	"college": College,
	"school":  School,
	"test":    Test,
}
