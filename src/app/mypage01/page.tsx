"use client";

import React, { useState } from "react";

const workOptions = [
  { label: "Develop", value: "develop", icon: "/images/developicon.png" },
  { label: "Design", value: "design", icon: "/images/designicon.png" },
  { label: "Music", value: "music", icon: "/images/musicicon.png" },
  { label: "Video", value: "video", icon: "/images/videoicon.png" },
];

const menuItems = [
  { key: "profile", label: "내 정보", icon: "/images/icon_profile.png" },
  { key: "portfolio", label: "내 포트폴리오", icon: "/images/icon_portfolio.png" },
  { key: "register", label: "포트폴리오 등록", icon: "/images/icon_register.png" },
  { key: "job", label: "채용하기", icon: "/images/icon_job.png" },
];

export default function MyPage() {
  const [selected, setSelected] = useState(workOptions[0]);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("profile");
  const [homepages, setHomepages] = useState([""]);

  const handleHomepageChange = (index: number, value: string) => {
    const newList = [...homepages];
    newList[index] = value;
    setHomepages(newList);
  };

  const addHomepageField = () => {
    setHomepages([...homepages, ""]);
  };

  return (
    <div className="min-h-screen bg-white text-[#0A1B2D] px-8 md:px-32">
      <div className="max-w-7xl mx-auto flex gap-10 py-16">
        <aside className="w-80 flex flex-col gap-8">
          <div className="bg-white border border-[#0A1B2D] rounded-2xl p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-300 rounded-full" />
              <h2 className="text-lg font-pretendard font-bold">shy00502</h2>
            </div>
            <div className="mt-6">
              <p className="text-base font-pretendard font-bold mb-1">소개</p>
              <p className="text-sm font-pretendard font-semibold">• 호기심이 많고 꾸미기를 좋아하는 디자이너입니다.</p>
            </div>
            <div className="mt-6">
              <p className="text-base font-pretendard font-bold mb-1">작업분야</p>
              <div className="flex items-center gap-2">
                <img src={selected.icon} alt={selected.label} className="w-5 h-5" />
                <span className="text-sm font-pretendard font-semibold">{selected.label}</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-base font-pretendard font-bold mb-1">활동 정보</p>
              <ul className="text-sm grid grid-cols-3 text-center">
                <li>
                  <div className="font-bold font-pretendard">3</div>
                  <div className="text-xs font-pretendard font-semibold">포트폴리오 개수</div>
                </li>
                <li>
                  <div className="font-bold font-pretendard">0</div>
                  <div className="text-xs font-pretendard font-semibold">좋아요 받음</div>
                </li>
                <li>
                  <div className="font-bold font-pretendard">0</div>
                  <div className="text-xs font-pretendard font-semibold">내 좋아요</div>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <p className="text-base font-pretendard font-bold mb-1">개인 홈페이지</p>
              <input
                type="url"
                className="w-full border border-[#0A1B2D] rounded-md px-3 py-2 text-sm font-pretendard font-semibold"
                placeholder=""
              />
            </div>
          </div>
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <div
                key={item.key}
                onClick={() => setActiveMenu(item.key)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="w-4">
                  {activeMenu === item.key && <span className="text-[#0A1B2D]">▶</span>}
                </span>
                <img src={item.icon} alt={item.label} className="w-5 h-5" />
                <span className="text-lg font-pretendard font-bold">{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        <section className="flex-1">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-base font-pretendard font-bold">내 정보</h3>
            <button className="bg-[#0A1B2D] text-white py-2 px-4 rounded-full text-sm font-pretendard font-bold hover:opacity-90 transition">
              등록
            </button>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full" />
            <div>
              <button className="border border-[#0A1B2D] rounded-full px-4 py-2 text-sm font-pretendard font-semibold flex items-center gap-2">
                <img src="/images/icon_upload.png" className="w-4 h-4" alt="업로드" />
                프로필 사진 업로드
              </button>
              <p className="text-xs text-gray-500 mt-1">
                <span className="font-bold">10MB</span> 이내의 이미지 파일을 업로드 해주세요.
              </p>
            </div>
          </div>

          <form className="space-y-4">
            {["사용자 이름", "이메일", "비밀번호", "비밀번호 재입력"].map((label, idx) => (
              <div key={idx}>
                <label className="block mb-1 font-pretendard font-bold text-sm">{label}</label>
                <input
                  type={label.includes("비밀번호") ? "password" : "text"}
                  className="w-full border border-[#a4a1aa] rounded-md py-2 px-3 outline-none font-pretendard font-semibold"
                />
              </div>
            ))}

            <div>
              <label className="block mb-1 font-pretendard font-bold text-sm">작업분야</label>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={selected.icon} alt={selected.label} className="w-5 h-5" />
                  <span className="text-sm font-pretendard font-semibold">{selected.label}</span>
                </div>
                <span
                  className="text-xs font-pretendard font-semibold text-[#0A1B2D] cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  작업분야 설정 &gt;
                </span>
              </div>
              {open && (
                <div className="mt-2 w-fit bg-white border border-[#a4a1aa] rounded-md shadow text-sm">
                  {workOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setSelected(option);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={option.icon} alt={option.label} className="w-5 h-5" />
                      <span className="font-pretendard font-semibold">{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-pretendard font-bold text-base">추가 정보</label>
              <label className="block mb-1 font-pretendard font-bold text-sm">소개</label>
              <textarea
                rows={4}
                className="w-full border border-[#a4a1aa] rounded-md py-2 px-3 outline-none font-pretendard font-semibold"
              />
            </div>

            <div>
              <label className="block text-sm font-pretendard font-bold mb-1">개인 홈페이지</label>
              {homepages.map((url, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleHomepageChange(idx, e.target.value)}
                    className="w-full border border-[#a4a1aa] rounded-md py-2 px-3 outline-none font-pretendard font-semibold placeholder:text-xs placeholder:text-gray-400"
                    placeholder="운영중인 개인 홈페이지를 입력해주세요"
                  />
                  <button
                    type="button"
                    className="border border-[#a4a1aa] rounded-md px-2 text-sm font-pretendard"
                    onClick={addHomepageField}
                  >
                    ＋
                  </button>
                </div>
              ))}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
