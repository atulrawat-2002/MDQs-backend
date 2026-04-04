import mongoose from "mongoose";
import { connectDB } from "./src/configs/dbConfig.js";
import Course from "./src/schemas/courseSchema.js";
import Semester from "./src/schemas/semesterSchema.js";
import Subject from "./src/schemas/subjectSchema.js";

// ─── COURSES ─────────────────────────────────────────────────────────────────

const courses = [
  { _id: new mongoose.Types.ObjectId("64f3a2b1c9e4d00001000001"), name: "MCA" },
  { _id: new mongoose.Types.ObjectId("64f3a2b1c9e4d00001000002"), name: "BCA" },
  { _id: new mongoose.Types.ObjectId("64f3a2b1c9e4d00001000003"), name: "B-TECH" },
  { _id: new mongoose.Types.ObjectId("64f3a2b1c9e4d00001000004"), name: "MBA" },
];

// ─── SEMESTERS (6 per course = 24 total) ─────────────────────────────────────

const semesters = [];
let semCounter = 1;

for (const course of courses) {
  for (let i = 1; i <= 6; i++) {
    semesters.push({
      _id: new mongoose.Types.ObjectId(`64f3a2b1c9e4d000020000${String(semCounter).padStart(2, "0")}`),
      number: i,
      courseId: course._id
    });
    semCounter++;
  }
}

// Helper to get semester _id
// courseIndex: 0=MCA, 1=BCA, 2=B-TECH, 3=MBA
const getSemId = (courseIndex, semNumber) =>
  semesters[(courseIndex * 6) + (semNumber - 1)]._id;

const getCourseId = (courseIndex) => courses[courseIndex]._id;

// ─── SUBJECTS ────────────────────────────────────────────────────────────────

let subCounter = 1;
const sid = () => new mongoose.Types.ObjectId(
  `64f3a2b1c9e4d0000300${String(subCounter++).padStart(4, "0")}`
);

const subjects = [

  // ── MCA (courseIndex 0) ──────────────────────────────────────────────────

  // Sem 1
  { _id: sid(), name: "Object Oriented Programming Using JAVA",          courseId: getCourseId(0), semesterId: getSemId(0, 1) },
  { _id: sid(), name: "Compiler Design",                                  courseId: getCourseId(0), semesterId: getSemId(0, 1) },
  { _id: sid(), name: "Computer Graphics & Multimedia",                   courseId: getCourseId(0), semesterId: getSemId(0, 1) },
  { _id: sid(), name: "Digital Design & Computer Architecture",           courseId: getCourseId(0), semesterId: getSemId(0, 1) },
  { _id: sid(), name: "Advance Data Structures Using C++/Java",           courseId: getCourseId(0), semesterId: getSemId(0, 1) },

  // Sem 2
  { _id: sid(), name: "Advance Object Technology",                        courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "Advance Database Systems & Data Warehouse",        courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "Operating Systems & Shell Programming",            courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "Theory of Computation",                            courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "Computer Networks & Distributed Systems",          courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "Web Technologies",                                 courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "Cloud Computing",                                  courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "Software Engineering",                             courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "Advance Computer Architecture & Quantum Computing",courseId: getCourseId(0), semesterId: getSemId(0, 2) },

  // Sem 3
  { _id: sid(), name: "Data Mining & Big Data Analytics",                 courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "Artificial Intelligence & Computational Intelligence", courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "Android Mobile Application Development",           courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "Computer Vision",                                  courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "Software Testing & Quality Assurance",             courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "Mixed Reality & Wearable Computing",               courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "Network Programming",                              courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "Natural Language Processing & Speech Recognition", courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "Bioinformatics Computing",                         courseId: getCourseId(0), semesterId: getSemId(0, 3) },

  // Sem 4
  { _id: sid(), name: "Advance Software Engineering",                     courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "IoT & Sensor Networks",                            courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "Web Development Using .NET Framework",             courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "Cyber Security & Blockchain Technology",           courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "Edge and Fog Computing",                           courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "High Speed Networks",                              courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "Machine Learning & Python Programming",            courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "Web Development Using PHP",                        courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "Neural Networks & Deep Learning",                  courseId: getCourseId(0), semesterId: getSemId(0, 4) },

  // ── BCA (courseIndex 1) ──────────────────────────────────────────────────

  // Sem 1
  { _id: sid(), name: "Computer Fundamentals and Programming",            courseId: getCourseId(1), semesterId: getSemId(1, 1) },
  { _id: sid(), name: "Internet Technologies and Applications",           courseId: getCourseId(1), semesterId: getSemId(1, 1) },
  { _id: sid(), name: "Multimedia Information System",                    courseId: getCourseId(1), semesterId: getSemId(1, 1) },
  { _id: sid(), name: "Business Practice",                                courseId: getCourseId(1), semesterId: getSemId(1, 1) },

  // Sem 2
  { _id: sid(), name: "Data and File Structure",                          courseId: getCourseId(1), semesterId: getSemId(1, 2) },
  { _id: sid(), name: "Structured Systems Analysis and Design",           courseId: getCourseId(1), semesterId: getSemId(1, 2) },
  { _id: sid(), name: "Mathematical Foundations of Computer Science",     courseId: getCourseId(1), semesterId: getSemId(1, 2) },
  { _id: sid(), name: "Digital Electronics",                              courseId: getCourseId(1), semesterId: getSemId(1, 2) },

  // Sem 3
  { _id: sid(), name: "Computer System Architecture",                     courseId: getCourseId(1), semesterId: getSemId(1, 3) },
  { _id: sid(), name: "Algorithms and Advanced Data Structures",          courseId: getCourseId(1), semesterId: getSemId(1, 3) },
  { _id: sid(), name: "Micro-Processor and Assembly Language",            courseId: getCourseId(1), semesterId: getSemId(1, 3) },
  { _id: sid(), name: "Database Systems",                                 courseId: getCourseId(1), semesterId: getSemId(1, 3) },

  // Sem 4
  { _id: sid(), name: "Operating Systems Organisation and Unix",          courseId: getCourseId(1), semesterId: getSemId(1, 4) },
  { _id: sid(), name: "Software Engineering",                             courseId: getCourseId(1), semesterId: getSemId(1, 4) },
  { _id: sid(), name: "Object Oriented Design and Programming",           courseId: getCourseId(1), semesterId: getSemId(1, 4) },
  { _id: sid(), name: "Financial Accounting",                             courseId: getCourseId(1), semesterId: getSemId(1, 4) },

  // Sem 5
  { _id: sid(), name: "Data Communications and Network",                  courseId: getCourseId(1), semesterId: getSemId(1, 5) },
  { _id: sid(), name: "Computer Graphics",                                courseId: getCourseId(1), semesterId: getSemId(1, 5) },
  { _id: sid(), name: "Principles of Visual and Windows Programming",     courseId: getCourseId(1), semesterId: getSemId(1, 5) },
  { _id: sid(), name: "Java Programming and Internet Applications",       courseId: getCourseId(1), semesterId: getSemId(1, 5) },

  // ── B-TECH (courseIndex 2) ───────────────────────────────────────────────

  // Sem 1
  { _id: sid(), name: "Essentials of Communication",                      courseId: getCourseId(2), semesterId: getSemId(2, 1) },
  { _id: sid(), name: "Mathematics-I",                                    courseId: getCourseId(2), semesterId: getSemId(2, 1) },
  { _id: sid(), name: "Physics-I",                                        courseId: getCourseId(2), semesterId: getSemId(2, 1) },
  { _id: sid(), name: "Fundamentals of Computer & Programming",           courseId: getCourseId(2), semesterId: getSemId(2, 1) },
  { _id: sid(), name: "Basics of Electronics",                            courseId: getCourseId(2), semesterId: getSemId(2, 1) },

  // Sem 2
  { _id: sid(), name: "Engineering Chemistry",                            courseId: getCourseId(2), semesterId: getSemId(2, 2) },
  { _id: sid(), name: "Environmental Studies",                            courseId: getCourseId(2), semesterId: getSemId(2, 2) },

];

// ─── SEED FUNCTION ───────────────────────────────────────────────────────────

async function seed() {
  try {
    await connectDB();
    console.log("Connected to DB");

    await Course.deleteMany();
    await Semester.deleteMany();
    await Subject.deleteMany();
    console.log("✅ Cleared existing data");

    await Course.insertMany(courses);
    console.log(`✅ ${courses.length} Courses inserted`);

    await Semester.insertMany(semesters);
    console.log(`✅ ${semesters.length} Semesters inserted`);

    await Subject.insertMany(subjects);
    console.log(`✅ ${subjects.length} Subjects inserted`);

    console.log("🎉 Seeding complete!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("DB connection closed");
  }
}

seed();