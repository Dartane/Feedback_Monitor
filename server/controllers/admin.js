import pool from "../db.js";
import bcrypt from "bcrypt";
// import xlsx from "xlsx";

class Controller {

  async addDoctor(req, res) {
    try {
      const { firstName, lastName, middleName, specialty, email, password } =
        req.body;

      const fullName = `${firstName} ${lastName} ${middleName}`;

      const userAlreadExists = await pool.query(
        "SELECT * FROM users WHERE email= $1",
        [email]
      );

      if (userAlreadExists.rows.length > 0) {
        return res
          .status(409)
          .json({ error: "Такой email уже зарегистрирован" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      console.log(req.user.user_id);
      const newUser = await pool.query(
        "INSERT INTO users (email, password_hash, role_id) VALUES ($1, $2, $3) RETURNING *",
        [email, hashedPassword, 2]
      );

      const newUserId = newUser.rows[0].user_id;

      const doctorAdd = await pool.query(
        "INSERT INTO doctors (user_id, name,  specialty) VALUES ($1, $2,$3)",
        [newUserId, fullName, specialty]
      );
      return res.json({ user: newUser.rows[0], doctorAdd: doctorAdd.rows[0] });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //список врачей
  async getAllDoctors(req, res) {
    try {
      const engineer = await pool.query(
        "SELECT Engineer.id_eng AS id_eng, Engineer.eng_name AS name, Engineer.eng_specialty AS specialty, ROUND(AVG(Feedback.full_mark), 2) AS avg_feedback FROM Engineer JOIN Works ON Engineer.id_eng = Works.Id_eng JOIN Feedback ON Works.Id_work = Feedback.Id_work GROUP BY Engineer.id_eng, Engineer.eng_name, Engineer.eng_specialty;"
      );
      res.json(engineer.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllDoctorsNames(req, res) {
    try {
      const engineer = await pool.query(
        "SELECT id_eng, eng_name FROM Engineer;"
      );
      res.json(engineer.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDoctorById(req, res) {
    try {
      const doctorId = req.params.id;

      const query = `
            SELECT Doctors.doctor_id, Doctors.name, Doctors.specialty, Users.email 
            FROM Doctors 
            INNER JOIN Users ON Doctors.user_id = Users.user_id 
            WHERE Doctors.doctor_id = $1
        `;

      const result = await pool.query(query, [doctorId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Врач не найден." });
      }

      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async getEngFeedTableById(req, res) {
    try {
      const id_eng = req.params.id;
      console.log(id_eng);

      const query = `
      SELECT Engineer.eng_name, 
       COUNT(CASE WHEN feedback.full_mark = 5 THEN 1 END) AS count_mark_5,
       COUNT(CASE WHEN feedback.full_mark = 4 THEN 1 END) AS count_mark_4,
       COUNT(CASE WHEN feedback.full_mark = 3 THEN 1 END) AS count_mark_3,
       COUNT(CASE WHEN feedback.full_mark = 2 THEN 1 END) AS count_mark_2,
       COUNT(CASE WHEN feedback.full_mark = 1 THEN 1 END) AS count_mark_1
FROM Engineer
JOIN Works ON Engineer.Id_eng = Works.Id_eng
JOIN feedback ON Works.Id_work = feedback.Id_work
WHERE Engineer.id_eng = $1
GROUP BY Engineer.eng_name;
        `;
        console.log();
      const result = await pool.query(query, [id_eng]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Инженер не найден." });
      }
      res.json(result.rows[0]);
      console.log(res);
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }

  //Удаление врача
  async deleteDoctor(req, res) {
    try {
      const doctorId = req.params.id;

      const doctor = await pool.query(
        "SELECT user_id FROM doctors WHERE doctor_id = $1",
        [doctorId]
      );

      if (doctor.rows.length === 0) {
        return res.status(404).json({ error: "Врач не найден." });
      }

      // Удаляем врача из таблицы doctors
      await pool.query("DELETE FROM doctors WHERE doctor_id = $1", [doctorId]);

      // Удаляем пользователя из таблицы users
      const userId = doctor.rows[0].user_id;
      await pool.query("DELETE FROM users WHERE user_id = $1", [userId]);

      res
        .status(200)
        .json({ message: "Врач и связанный пользователь успешно удалены." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //редактирование врача
  async updateDoctor(req, res) {
    try {
      const doctorId = req.params.id;
      const { firstName, lastName, middleName, specialty, email, password } =
        req.body;
      const fullName = `${firstName} ${lastName} ${middleName}`; // Сконструировать полное имя

      // Находим пользователя, связанного с врачом
      const user = await pool.query(
        "SELECT * FROM users WHERE user_id = (SELECT user_id FROM doctors WHERE doctor_id = $1)",
        [doctorId]
      );

      // Если пользователь не найден, возвращаем ошибку
      if (user.rows.length === 0) {
        return res.status(404).json({ error: "Врач не найден." });
      }

      // Обновляем email пользователя, если он предоставлен
      if (email) {
        await pool.query("UPDATE users SET email = $1 WHERE user_id = $2", [
          email,
          user.rows[0].user_id,
        ]);
      }

      // Обновляем пароль пользователя, если он предоставлен
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await pool.query(
          "UPDATE users SET password_hash = $1 WHERE user_id = $2",
          [hashedPassword, user.rows[0].user_id]
        );
      }

      // Обновляем запись врача
      const updatedDoctor = await pool.query(
        "UPDATE doctors SET name = $1, specialty = $2 WHERE doctor_id = $3 RETURNING *",
        [fullName, specialty, doctorId]
      );

      // Возвращаем обновленные данные
      return res.json({ user: user.rows[0], doctor: updatedDoctor.rows[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Талоны

  //создание талонов
  async createSchedule(req, res) {
    try {
    
      const { id_eng } = req.body;

      if (startTimes.length !== endTimes.length) {
        return res
          .status(400)
          .json({ error: "Несоответствие временных интервалов." });
      }

      for (let i = 0; i < startTimes.length; i++) {
        await pool.query(
          "INSERT INTO schedule (doctor_id,is_booked,date, start_time, end_time) VALUES ($1, $2, $3, $4,$5)",
          [doctorId, false, date, startTimes[i], endTimes[i]]
        );
      }

      return res.status(201).json({ message: "Расписание успешно создано." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //получение талонов конкретного врача
  async getSchedule(req, res) {
    try {
      const doctorId = req.params.id;

      const roleId = req.user.role_id;
      console.log(doctorId);

      const schedule = await pool.query(
        "SELECT sch.schedule_id, sch.doctor_id, sch.start_time, sch.end_time, sch.is_booked, doc.name FROM Schedule sch JOIN Doctors doc ON sch.doctor_id = doc.doctor_id WHERE sch.doctor_id = $1 ORDER BY sch.start_time",
        [doctorId]
      );

      if (schedule.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Расписание для данного врача не найдено." });
      }

      return res.status(200).json({ schedule: schedule.rows });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //получение всех талонов

  async getAllSchedules(req, res) {
    try {
      //const roleId = req.user.role_id;

      const schedules = await pool.query(
        "SELECT feedback.*, to_char(Request.finish_date, 'DD/mm/YYYY') as finish_date, Works.id_eng FROM feedback JOIN Works ON feedback.Id_work = Works.Id_work JOIN Request ON Works.id_request = Request.id_request;"
      );

      if (schedules.rows.length === 0) {
        return res.status(404).json({ error: "Отзывы не найдены." });
      }

     // console.log(res);
      return res.status(200).json({ feedback: schedules.rows });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //удаление талона конкретного врача

  async deleteSchedule(req, res) {
    try {
      const scheduleId = req.params.id; // ID расписания получаем из параметров маршрута

      // Удаление расписания по ID
      const deleteOp = await pool.query(
        "DELETE FROM schedule WHERE schedule_id = $1",
        [scheduleId]
      );

      // Если не найдено ни одной записи для удаления, возвращаем ошибку
      if (deleteOp.rowCount === 0) {
        return res
          .status(404)
          .json({ error: "Талон не найдено или уже удален." });
      }

      return res.status(200).json({ message: "Талон успешно удален." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new Controller();
