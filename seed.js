import mongoose from "mongoose";
import { connectDB } from "./src/configs/dbConfig.js";
import Course from "./src/schemas/courseSchema.js";
import Semester from "./src/schemas/semesterSchema.js";
import Subject from "./src/schemas/subjectSchema.js";

// ─── COURSES ─────────────────────────────────────────────────────────────────

const courses = [
  { _id: new mongoose.Types.ObjectId("64f3a2b1c9e4d00001000001"), name: "BCA" },
  { _id: new mongoose.Types.ObjectId("64f3a2b1c9e4d00001000002"), name: "MCA" },
  { _id: new mongoose.Types.ObjectId("64f3a2b1c9e4d00001000003"), name: "MBA" },
  { _id: new mongoose.Types.ObjectId("64f3a2b1c9e4d00001000004"), name: "B-TECH" },
  { _id: new mongoose.Types.ObjectId("64f3a2b1c9e4d00001000005"), name: "B-COM" },
];

// ─── SEMESTERS (6 per course = 30 total) ─────────────────────────────────────

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

// Helper to get semester _id by course index and semester number
// courseIndex: 0=BCA, 1=MCA, 2=MBA, 3=B-TECH, 4=B-COM
const getSemId = (courseIndex, semNumber) => {
  return semesters[(courseIndex * 6) + (semNumber - 1)]._id;
};

const getCourseId = (courseIndex) => courses[courseIndex]._id;

// ─── SUBJECTS ────────────────────────────────────────────────────────────────

let subCounter = 1;
const sid = () => new mongoose.Types.ObjectId(`64f3a2b1c9e4d0000300${String(subCounter++).padStart(4, "0")}`);

const subjects = [

  // ── BCA (courseIndex 0) ──────────────────────────────────────────────────
  // Sem 1
  { _id: sid(), name: "C Programming",               courseId: getCourseId(0), semesterId: getSemId(0, 1) },
  { _id: sid(), name: "Mathematics I",               courseId: getCourseId(0), semesterId: getSemId(0, 1) },
  { _id: sid(), name: "Digital Electronics",         courseId: getCourseId(0), semesterId: getSemId(0, 1) },
  { _id: sid(), name: "Introduction to Computers",   courseId: getCourseId(0), semesterId: getSemId(0, 1) },
  { _id: sid(), name: "English Communication",       courseId: getCourseId(0), semesterId: getSemId(0, 1) },
  // Sem 2
  { _id: sid(), name: "Data Structures",             courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "Computer Organisation",       courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "Mathematics II",              courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "OOP with C++",                courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  { _id: sid(), name: "PC Software Lab",             courseId: getCourseId(0), semesterId: getSemId(0, 2) },
  // Sem 3
  { _id: sid(), name: "OOP with Java",               courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "Operating Systems",           courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "DBMS",                        courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "Discrete Mathematics",        courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  { _id: sid(), name: "Computer Networks",           courseId: getCourseId(0), semesterId: getSemId(0, 3) },
  // Sem 4
  { _id: sid(), name: "Web Technologies",            courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "Software Engineering",        courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "Python Programming",          courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "Computer Graphics",           courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  { _id: sid(), name: "Linux Administration",        courseId: getCourseId(0), semesterId: getSemId(0, 4) },
  // Sem 5
  { _id: sid(), name: "Advanced Java",               courseId: getCourseId(0), semesterId: getSemId(0, 5) },
  { _id: sid(), name: "Cloud Computing",             courseId: getCourseId(0), semesterId: getSemId(0, 5) },
  { _id: sid(), name: "Mobile App Development",      courseId: getCourseId(0), semesterId: getSemId(0, 5) },
  { _id: sid(), name: "Cyber Security",              courseId: getCourseId(0), semesterId: getSemId(0, 5) },
  // Sem 6
  { _id: sid(), name: "Machine Learning",            courseId: getCourseId(0), semesterId: getSemId(0, 6) },
  { _id: sid(), name: "Project & Viva",              courseId: getCourseId(0), semesterId: getSemId(0, 6) },
  { _id: sid(), name: "Research Methodology",        courseId: getCourseId(0), semesterId: getSemId(0, 6) },

  // ── MCA (courseIndex 1) ──────────────────────────────────────────────────
  // Sem 1
  { _id: sid(), name: "Discrete Mathematics",        courseId: getCourseId(1), semesterId: getSemId(1, 1) },
  { _id: sid(), name: "Advanced Java",               courseId: getCourseId(1), semesterId: getSemId(1, 1) },
  { _id: sid(), name: "Algorithm Design",            courseId: getCourseId(1), semesterId: getSemId(1, 1) },
  { _id: sid(), name: "Computer Organisation",       courseId: getCourseId(1), semesterId: getSemId(1, 1) },
  { _id: sid(), name: "Communication Skills",        courseId: getCourseId(1), semesterId: getSemId(1, 1) },
  // Sem 2
  { _id: sid(), name: "Advanced DBMS",               courseId: getCourseId(1), semesterId: getSemId(1, 2) },
  { _id: sid(), name: "Software Testing",            courseId: getCourseId(1), semesterId: getSemId(1, 2) },
  { _id: sid(), name: "Cloud Computing",             courseId: getCourseId(1), semesterId: getSemId(1, 2) },
  { _id: sid(), name: "Computer Networks",           courseId: getCourseId(1), semesterId: getSemId(1, 2) },
  { _id: sid(), name: "Web Technologies",            courseId: getCourseId(1), semesterId: getSemId(1, 2) },
  // Sem 3
  { _id: sid(), name: "Machine Learning",            courseId: getCourseId(1), semesterId: getSemId(1, 3) },
  { _id: sid(), name: "Distributed Systems",         courseId: getCourseId(1), semesterId: getSemId(1, 3) },
  { _id: sid(), name: "Big Data Analytics",          courseId: getCourseId(1), semesterId: getSemId(1, 3) },
  { _id: sid(), name: "Python Programming",          courseId: getCourseId(1), semesterId: getSemId(1, 3) },
  { _id: sid(), name: "Operating Systems",           courseId: getCourseId(1), semesterId: getSemId(1, 3) },
  // Sem 4
  { _id: sid(), name: "Cyber Security",              courseId: getCourseId(1), semesterId: getSemId(1, 4) },
  { _id: sid(), name: "Mobile App Development",      courseId: getCourseId(1), semesterId: getSemId(1, 4) },
  { _id: sid(), name: "Research Methodology",        courseId: getCourseId(1), semesterId: getSemId(1, 4) },
  { _id: sid(), name: "Software Engineering",        courseId: getCourseId(1), semesterId: getSemId(1, 4) },
  { _id: sid(), name: "IoT & Embedded Systems",      courseId: getCourseId(1), semesterId: getSemId(1, 4) },
  // Sem 5
  { _id: sid(), name: "Deep Learning",               courseId: getCourseId(1), semesterId: getSemId(1, 5) },
  { _id: sid(), name: "Blockchain Technology",       courseId: getCourseId(1), semesterId: getSemId(1, 5) },
  { _id: sid(), name: "DevOps",                      courseId: getCourseId(1), semesterId: getSemId(1, 5) },
  { _id: sid(), name: "Data Visualization",          courseId: getCourseId(1), semesterId: getSemId(1, 5) },
  // Sem 6
  { _id: sid(), name: "Dissertation",                courseId: getCourseId(1), semesterId: getSemId(1, 6) },
  { _id: sid(), name: "Seminar",                     courseId: getCourseId(1), semesterId: getSemId(1, 6) },
  { _id: sid(), name: "Entrepreneurship",            courseId: getCourseId(1), semesterId: getSemId(1, 6) },

  // ── MBA (courseIndex 2) ──────────────────────────────────────────────────
  // Sem 1
  { _id: sid(), name: "Principles of Management",    courseId: getCourseId(2), semesterId: getSemId(2, 1) },
  { _id: sid(), name: "Business Economics",          courseId: getCourseId(2), semesterId: getSemId(2, 1) },
  { _id: sid(), name: "Financial Accounting",        courseId: getCourseId(2), semesterId: getSemId(2, 1) },
  { _id: sid(), name: "Organisational Behaviour",    courseId: getCourseId(2), semesterId: getSemId(2, 1) },
  { _id: sid(), name: "Business Communication",      courseId: getCourseId(2), semesterId: getSemId(2, 1) },
  // Sem 2
  { _id: sid(), name: "Marketing Management",        courseId: getCourseId(2), semesterId: getSemId(2, 2) },
  { _id: sid(), name: "Human Resource Management",   courseId: getCourseId(2), semesterId: getSemId(2, 2) },
  { _id: sid(), name: "Business Law",                courseId: getCourseId(2), semesterId: getSemId(2, 2) },
  { _id: sid(), name: "Operations Management",       courseId: getCourseId(2), semesterId: getSemId(2, 2) },
  { _id: sid(), name: "Managerial Economics",        courseId: getCourseId(2), semesterId: getSemId(2, 2) },
  // Sem 3
  { _id: sid(), name: "Strategic Management",        courseId: getCourseId(2), semesterId: getSemId(2, 3) },
  { _id: sid(), name: "Entrepreneurship",            courseId: getCourseId(2), semesterId: getSemId(2, 3) },
  { _id: sid(), name: "Corporate Finance",           courseId: getCourseId(2), semesterId: getSemId(2, 3) },
  { _id: sid(), name: "International Business",      courseId: getCourseId(2), semesterId: getSemId(2, 3) },
  { _id: sid(), name: "Business Ethics",             courseId: getCourseId(2), semesterId: getSemId(2, 3) },
  // Sem 4
  { _id: sid(), name: "Supply Chain Management",     courseId: getCourseId(2), semesterId: getSemId(2, 4) },
  { _id: sid(), name: "Digital Marketing",           courseId: getCourseId(2), semesterId: getSemId(2, 4) },
  { _id: sid(), name: "Investment Management",       courseId: getCourseId(2), semesterId: getSemId(2, 4) },
  { _id: sid(), name: "Consumer Behaviour",          courseId: getCourseId(2), semesterId: getSemId(2, 4) },
  { _id: sid(), name: "Corporate Governance",        courseId: getCourseId(2), semesterId: getSemId(2, 4) },
  // Sem 5
  { _id: sid(), name: "Project Management",          courseId: getCourseId(2), semesterId: getSemId(2, 5) },
  { _id: sid(), name: "Business Analytics",          courseId: getCourseId(2), semesterId: getSemId(2, 5) },
  { _id: sid(), name: "Talent Management",           courseId: getCourseId(2), semesterId: getSemId(2, 5) },
  { _id: sid(), name: "Retail Management",           courseId: getCourseId(2), semesterId: getSemId(2, 5) },
  // Sem 6
  { _id: sid(), name: "MBA Dissertation",            courseId: getCourseId(2), semesterId: getSemId(2, 6) },
  { _id: sid(), name: "Leadership & Change",         courseId: getCourseId(2), semesterId: getSemId(2, 6) },
  { _id: sid(), name: "Global Business Strategy",    courseId: getCourseId(2), semesterId: getSemId(2, 6) },

  // ── B-TECH (courseIndex 3) ───────────────────────────────────────────────
  // Sem 1
  { _id: sid(), name: "Engineering Mathematics I",   courseId: getCourseId(3), semesterId: getSemId(3, 1) },
  { _id: sid(), name: "Engineering Physics",         courseId: getCourseId(3), semesterId: getSemId(3, 1) },
  { _id: sid(), name: "Engineering Chemistry",       courseId: getCourseId(3), semesterId: getSemId(3, 1) },
  { _id: sid(), name: "C Programming",               courseId: getCourseId(3), semesterId: getSemId(3, 1) },
  { _id: sid(), name: "Engineering Drawing",         courseId: getCourseId(3), semesterId: getSemId(3, 1) },
  // Sem 2
  { _id: sid(), name: "Data Structures",             courseId: getCourseId(3), semesterId: getSemId(3, 2) },
  { _id: sid(), name: "Digital Logic Design",        courseId: getCourseId(3), semesterId: getSemId(3, 2) },
  { _id: sid(), name: "Electronics Devices",         courseId: getCourseId(3), semesterId: getSemId(3, 2) },
  { _id: sid(), name: "Engineering Mathematics II",  courseId: getCourseId(3), semesterId: getSemId(3, 2) },
  { _id: sid(), name: "Environmental Science",       courseId: getCourseId(3), semesterId: getSemId(3, 2) },
  // Sem 3
  { _id: sid(), name: "Signals & Systems",           courseId: getCourseId(3), semesterId: getSemId(3, 3) },
  { _id: sid(), name: "Microprocessors",             courseId: getCourseId(3), semesterId: getSemId(3, 3) },
  { _id: sid(), name: "DBMS",                        courseId: getCourseId(3), semesterId: getSemId(3, 3) },
  { _id: sid(), name: "OOP with Java",               courseId: getCourseId(3), semesterId: getSemId(3, 3) },
  { _id: sid(), name: "Computer Networks",           courseId: getCourseId(3), semesterId: getSemId(3, 3) },
  // Sem 4
  { _id: sid(), name: "VLSI Design",                 courseId: getCourseId(3), semesterId: getSemId(3, 4) },
  { _id: sid(), name: "Embedded Systems",            courseId: getCourseId(3), semesterId: getSemId(3, 4) },
  { _id: sid(), name: "Computer Architecture",       courseId: getCourseId(3), semesterId: getSemId(3, 4) },
  { _id: sid(), name: "Control Systems",             courseId: getCourseId(3), semesterId: getSemId(3, 4) },
  { _id: sid(), name: "Operating Systems",           courseId: getCourseId(3), semesterId: getSemId(3, 4) },
  // Sem 5
  { _id: sid(), name: "Digital Communication",       courseId: getCourseId(3), semesterId: getSemId(3, 5) },
  { _id: sid(), name: "Power Electronics",           courseId: getCourseId(3), semesterId: getSemId(3, 5) },
  { _id: sid(), name: "Machine Learning",            courseId: getCourseId(3), semesterId: getSemId(3, 5) },
  { _id: sid(), name: "Cloud Computing",             courseId: getCourseId(3), semesterId: getSemId(3, 5) },
  { _id: sid(), name: "Cyber Security",              courseId: getCourseId(3), semesterId: getSemId(3, 5) },
  // Sem 6
  { _id: sid(), name: "Final Year Project",          courseId: getCourseId(3), semesterId: getSemId(3, 6) },
  { _id: sid(), name: "Seminar",                     courseId: getCourseId(3), semesterId: getSemId(3, 6) },
  { _id: sid(), name: "Industrial Training",         courseId: getCourseId(3), semesterId: getSemId(3, 6) },

  // ── B-COM (courseIndex 4) ────────────────────────────────────────────────
  // Sem 1
  { _id: sid(), name: "Business Mathematics",        courseId: getCourseId(4), semesterId: getSemId(4, 1) },
  { _id: sid(), name: "Principles of Economics",     courseId: getCourseId(4), semesterId: getSemId(4, 1) },
  { _id: sid(), name: "Financial Accounting I",      courseId: getCourseId(4), semesterId: getSemId(4, 1) },
  { _id: sid(), name: "Business Organisation",       courseId: getCourseId(4), semesterId: getSemId(4, 1) },
  { _id: sid(), name: "English Communication",       courseId: getCourseId(4), semesterId: getSemId(4, 1) },
  // Sem 2
  { _id: sid(), name: "Corporate Accounting",        courseId: getCourseId(4), semesterId: getSemId(4, 2) },
  { _id: sid(), name: "Cost Accounting",             courseId: getCourseId(4), semesterId: getSemId(4, 2) },
  { _id: sid(), name: "Business Law",                courseId: getCourseId(4), semesterId: getSemId(4, 2) },
  { _id: sid(), name: "Marketing Management",        courseId: getCourseId(4), semesterId: getSemId(4, 2) },
  { _id: sid(), name: "Statistics for Business",     courseId: getCourseId(4), semesterId: getSemId(4, 2) },
  // Sem 3
  { _id: sid(), name: "Income Tax Law",              courseId: getCourseId(4), semesterId: getSemId(4, 3) },
  { _id: sid(), name: "Auditing",                    courseId: getCourseId(4), semesterId: getSemId(4, 3) },
  { _id: sid(), name: "Corporate Law",               courseId: getCourseId(4), semesterId: getSemId(4, 3) },
  { _id: sid(), name: "Financial Management",        courseId: getCourseId(4), semesterId: getSemId(4, 3) },
  { _id: sid(), name: "Human Resource Management",   courseId: getCourseId(4), semesterId: getSemId(4, 3) },
  // Sem 4
  { _id: sid(), name: "E-Commerce",                  courseId: getCourseId(4), semesterId: getSemId(4, 4) },
  { _id: sid(), name: "Banking & Insurance",         courseId: getCourseId(4), semesterId: getSemId(4, 4) },
  { _id: sid(), name: "GST & Indirect Tax",          courseId: getCourseId(4), semesterId: getSemId(4, 4) },
  { _id: sid(), name: "Entrepreneurship",            courseId: getCourseId(4), semesterId: getSemId(4, 4) },
  { _id: sid(), name: "International Trade",         courseId: getCourseId(4), semesterId: getSemId(4, 4) },
  // Sem 5
  { _id: sid(), name: "Investment & Portfolio",      courseId: getCourseId(4), semesterId: getSemId(4, 5) },
  { _id: sid(), name: "Strategic Management",        courseId: getCourseId(4), semesterId: getSemId(4, 5) },
  { _id: sid(), name: "Corporate Tax Planning",      courseId: getCourseId(4), semesterId: getSemId(4, 5) },
  { _id: sid(), name: "Stock Market Operations",     courseId: getCourseId(4), semesterId: getSemId(4, 5) },
  // Sem 6
  { _id: sid(), name: "Project Work",                courseId: getCourseId(4), semesterId: getSemId(4, 6) },
  { _id: sid(), name: "Viva Voce",                   courseId: getCourseId(4), semesterId: getSemId(4, 6) },
  { _id: sid(), name: "Business Research Methods",   courseId: getCourseId(4), semesterId: getSemId(4, 6) },
];

// ─── SEED FUNCTION ───────────────────────────────────────────────────────────

async function seed() {
  try {
    await connectDB();
    console.log("Connected to DB");

    await Course.deleteMany();
    await Semester.deleteMany();
    await Subject.deleteMany();
    console.log("Cleared existing data");

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