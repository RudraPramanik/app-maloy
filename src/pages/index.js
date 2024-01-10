import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import jsonData from '../db/db.json';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [error, setError] = useState(null);
  const [searchKadPengenalanMajikan, setSearchKadPengenalanMajikan] =
    useState('');
  const [searchNomborPermohonan, setSearchNomborPermohonan] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentDate(new Date());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run this effect once on mount

  useEffect(() => {
    let results = [];

    if (submitClicked) {
      if (searchKadPengenalanMajikan.trim() !== '') {
        results = jsonData.user.filter((user) =>
          user.KadPengenalanMajikan.toLowerCase().includes(
            searchKadPengenalanMajikan.toLowerCase()
          )
        );
      }

      if (searchNomborPermohonan.trim() !== '') {
        results = jsonData.user.filter((user) =>
          user.NomborPermohonan.toLowerCase().includes(
            searchNomborPermohonan.toLowerCase()
          )
        );
      }

      setSearchResults(results);
    }
  }, [searchKadPengenalanMajikan, searchNomborPermohonan, submitClicked]);

  const handleSearchSubmit = () => {
    setSubmitClicked(true);
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(currentDate);

  return (
    <main className="bg-[#163c4f] ">
      <MyTable formattedDate={formattedDate} currentTime={currentTime} />

      <div className=" flex ">
        <div className="w-20%">
          <p className="">
            <span className="text-white mt-2 ml-4 border-b-2 border-red-500 font-semibold text-[11px] ">
              MYONLINE*PEMBANTU RUMAH{' '}
            </span>{' '}
            <br />
            <span className="-ml-0 text-white -mt-2 border-b-2 border-red-500 font-semibold text-[11px] ">
              ASING / PEKERJA ASING
            </span>
          </p>
          <p className="text-[11px] mt-6 font-semibold text-[#FFFF00] items-center flex justify-center ">
            PERTANYAAN <br /> STATUS <br /> PERMOHONAN
          </p>
          {/*  */}
          <div className="text-white text-sm mt-2 ml-4 relative">
            <span className="border-b relative z-10">video tutorial </span>
            <span className="absolute top-0 left-0 right-0 h-2 border-t border-white z-0"></span>
            <span className="absolute bottom-0 left-0 right-0 h-2 border-b border-white z-0"></span>
          </div>
        </div>
        {/*  */}
        <div className=" w-[80%] ml-auto mr-0 bg-white border-white border-2 space-y-2 ">
          <h2 className=" pl-4 py-1 bg-gradient-to-r from-[#6f9dcc] to-[#6aabec] font-semibold text-[10px] text-white ">
            STATUS PERMOHONAN PEMBANTU RUMAH ASING / PEKERJA ASING
          </h2>
          <div className="flex bg-[#FFFF00] text-sm ">
            <div className="w-[20%] left-0 text-xs font-semibold space-y-[1px] ">
              <p>STATUS</p>
              <p>
                PERMOHONAN <br /> DITERIMA
              </p>
              <p className="mb-4">BARU</p>
              <p className="mb-4">LULUS</p>
              <p>TOLAK</p>
              <p>BATAL</p>
              <p>BAYAR</p>
              <p>CETAK</p>
              <p>TANGGUH</p>
            </div>
            <div className="w-[80%] text-xs font-semibold space-y-[1px] ">
              <p className=" h-4 "> </p>
              <p>- Permohonan telah diterima.</p>
              <p className="mt-4">
                {' '}
                - Permohonan telah diterima dan sedang diproses oleh Jabatan
                Imigresen Malaysia. Sila kirimkan salinan asal dari
                dokumen-dokumen sokongan sekiranya belum berbuat demikian.
              </p>
              <p>
                - Permohonan telah diluluskan oleh Jabatan Imigresen Malaysia
                dan bersedia untuk Pembayaran dan cetakan Pelekat. Sila buat
                pemeriksaan FOMEMA sekiranya belum berbuat demikian.
              </p>
              <p>- Permohonan telah ditolak oleh Jabatan Imigresen Malaysia.</p>
              <p>
                - Permohonan telah dibatalkan oleh Jabatan Imigresen Malaysia.
              </p>
              <p>
                {' '}
                - Permohonan telah dibayar dan bersedia untuk Cetakan Pelekat.
              </p>
              <p>- Pelekat telah di cetak dan sedia untuk dipungut.</p>
            </div>
          </div>
          {/* searchbar 1 */}
          <div className=" flex ">
            <div className="w-[45%] flex ">
              <div className="w-[45%]">
                <p className=" bg-[#B3D9FF] items-center py-3 text-xs ">
                  No. Kad Pengenalan Majikan
                </p>
              </div>
              {/* searchbar 1 */}
              <div
                className="w-[55%s] border-1 border-gray-700
               "
              >
                <input
                  type="text"
                  placeholder=""
                  value={searchKadPengenalanMajikan}
                  onChange={(e) =>
                    setSearchKadPengenalanMajikan(e.target.value)
                  }
                  className="w-full border border-black ml-1 h-5 "
                />
                <p className=" text-xs ">
                  {' '}
                  ( Contoh Format : 999999-99-9999 ){' '}
                </p>
              </div>
            </div>

            <div className="w-[55%] flex ">
              <h3 className=" font-semibold text-xs -ml-4 ">ATAU</h3>
              <div className="w-[45%]">
                <p className=" bg-[#B3D9FF] items-center py-3 text-xs ">
                  No. Pendaftaran Syarikat
                </p>
              </div>
              {/* searchbar 1 */}
              <div
                className="w-[55%s] 
               "
              >
                <input
                  type="text"
                  placeholder=""
                  value={''}
                  onChange={(e) => e.target.value}
                  className="w-full border border-gray-700 mt-2 ml-1 h-5 "
                />
              </div>
            </div>
          </div>
          {/* search3 */}
          <div>
            <div className=" flex ">
              <div className="">
                <p className=" bg-[#B3D9FF] pr-20 items-center py-1 text-xs  ">
                  Nombor Permohonan
                </p>
              </div>
              {/* searchbar 1 */}
              <div
                className="w-[33%] border-1 border-gray-700
               "
              >
                <input
                  type="text"
                  placeholder=""
                  value={searchNomborPermohonan}
                  onChange={(e) => setSearchNomborPermohonan(e.target.value)}
                  className="w-full border border-gray-700 ml-1 h-5 "
                />
              </div>
            </div>
          </div>
          {/* submit */}
          <div>
            <button
              className="text-xs border-2 border-gray-200 text-gray-400 px-2 "
              onClick={handleSearchSubmit}
            >
              Carian
            </button>
            <button
              className="text-xs border border-gray-700 px-2 font-semibold "
              onClick={handleSearchSubmit}
            >
              KOSONGKAN
            </button>
          </div>
          {/* submit */}
          {/* table */}
          <div className="">
            <table className="min-w-full border border-white w-full ">
              <thead>
                <tr className="bg-[#B3D9FF] text-[11px] ">
                  <th className="w-[4%] border border-white border-x-2">
                    Bill
                  </th>
                  <th className="w-[28%] border border-white border-x-2">
                    Nombor Permohonan
                  </th>
                  <th className="w-[15%] border border-white border-x-2">
                    No. Kad Pengenalan/
                    <br /> No. Pendaftaran <br /> Syarikat
                  </th>
                  <th className="w-[28%] border border-white border-x-2">
                    Nama Pekerja
                  </th>
                  <th className="w-[15%] border border-white border-x-2">
                    Nombor Dokumen
                  </th>
                  <th className="w-[9%] border border-white border-x-2">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResults.length > 0 || submitClicked
                  ? searchResults.map((user, i) => (
                      <tr key={user.id}>
                        <td className="border border-gray-300 p-2">{i}</td>
                        <td className="border border-gray-300 p-2">
                          {user.NomborPermohonan}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {user.KadPengenalanMajikan}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {user.NamaPekerja}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {user.NomborDokumen}
                        </td>

                        <td className="border border-gray-300 p-2">
                          {user.Status}
                        </td>
                        {/* Add more columns as needed */}
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
          {/* table */}
        </div>
      </div>
    </main>
  );
}

// components/MyTable.js

const MyTable = ({ formattedDate, currentTime }) => {
  return (
    <table className="w-full" border="0" cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          <td
            className="bg-cover"
            style={{
              backgroundImage: 'url("/images/header/ms_Animated96.gif")',
            }}
            height="96"
            width="775"
          >
            <table border="0" className="w-full">
              <tbody>
                <tr>
                  <td width="25"></td>
                  <td width="130"></td>
                  <td width="110"></td>
                  <td width="40"></td>
                  <td width="150"></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="row-span-3 align-bottom"></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="relative" rowspan="2">
                    <div className="w-20 overflow-auto h-8 absolute top-[22px] left-[92px] text-xs font-semibold ">
                      {currentTime.toLocaleTimeString()}
                      {/* <input
                        id="showText"
                        name="showText"
                        readOnly
                        className="w-16 text-center border-0 text-base font-bold font-sans"
                        type="text"
                      /> */}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className=" font-semibold text-sm ">
                    Log masuk adalah PELAWAT
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td
            className="bg-cover"
            style={{ backgroundImage: 'url("/images/header/square.jpg")' }}
            height="96"
          ></td>
          <td
            className="bg-cover"
            style={{ backgroundImage: 'url("/images/header/square.jpg")' }}
            height="96"
            width="220"
          >
            <table border="0" className="w-full">
              <tbody>
                <tr>
                  <td className="date">
                    <div id="currentDate"> {formattedDate}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      alt=""
                      border="0"
                      height="7"
                      src="/images/header/JIM_verticalLine.jpg"
                      width="200"
                    />
                  </td>
                </tr>
                <tr>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td>
                    <img
                      alt=""
                      border="0"
                      height="7"
                      src="/images/header/JIM_verticalLine.jpg"
                      width="200"
                    />
                  </td>
                </tr>
                <tr>
                  <td align="center"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
