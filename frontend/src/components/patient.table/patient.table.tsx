import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import css from "../../assets/styles/components/patient.table.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { PatientData } from "../../interface/patient/patient.interface.props";

interface PatientTableProps {
  patients: PatientData[];
  title: string;
  viewProfilePath: string;
}

export const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  title,
  viewProfilePath,
}) => {
  const navigate = useNavigate();
  const [searchRut, setSearchRut] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 20;

  const memoizedFilteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      return (
        (searchRut === "" || patient.rut?.includes(searchRut)) &&
        (searchPhone === "" || patient.phone?.includes(searchPhone))
      );
    });
  }, [patients, searchRut, searchPhone]);

  const totalPages = Math.max(
    1,
    Math.ceil(memoizedFilteredPatients.length / patientsPerPage)
  );
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = memoizedFilteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const handleViewProfile = (id: string) => {
    navigate(`${viewProfilePath}/${id}`);
  };

  return (
    <>
      <h1 className={css.name}>{title}</h1>
      <div className={css.background}>
        <p className={css.counter}>
          Total de pacientes: {memoizedFilteredPatients.length}
        </p>

        <div className={css.filters}>
          <input
            type="text"
            placeholder="Buscar por RUT"
            value={searchRut}
            onChange={(e) => {
              setSearchRut(e.target.value);
              setCurrentPage(1);
            }}
          />
          <input
            type="text"
            placeholder="Buscar por Teléfono"
            value={searchPhone}
            onChange={(e) => {
              setSearchPhone(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className={css.patientTableContainer}>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>RUT</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.length > 0 ? (
                currentPatients.map((patient) => (
                  <tr key={patient.id || JSON.stringify(patient)}>
                    <td>{patient.name}</td>
                    <td>{patient.lastname}</td>
                    <td>{patient.rut}</td>
                    <td>{patient.phone}</td>
                    <td>
                      <button
                        onClick={() => handleViewProfile(patient.id!)}
                        className={css.viewProfileButton}
                      >
                        Ver Ficha Clínica
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    No hay pacientes que coincidan con los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={css.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            <FontAwesomeIcon icon={faCircleLeft} className={css.icons} />
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
          >
            <FontAwesomeIcon icon={faCircleRight} className={css.icons} />
          </button>
        </div>
      </div>
    </>
  );
};
