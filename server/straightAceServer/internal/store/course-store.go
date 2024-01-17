package store

import "StraightAceServer/model"

var School = model.Course{
	Subjects: []string{"english", "maths"},
}

var College = model.Course{
	Subjects: []string{"fax", "weed"},
}

var CoursesMap = map[string]model.Course{
	"college": College,
	"school":  School,
}
