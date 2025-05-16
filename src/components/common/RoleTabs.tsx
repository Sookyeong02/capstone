interface RoleProps {
  value: 'personal' | 'company';
  onChange: (role: 'personal' | 'company') => void;
}

export default function RoleTabs({ value, onChange }: RoleProps) {
  return (
    <div className="flex justify-center gap-[80px]">
      {['personal', 'company'].map((role) => (
        <button
          key={role}
          style={{
            color: value === role ? 'var(--color-primary-yellow)' : undefined,
          }}
          className={`text-2xl transition-colors duration-200 ${
            value === role ? 'font-bold' : 'font-semibold text-gray-300'
          }`}
          onClick={() => onChange(role as 'personal' | 'company')}
        >
          {role === 'personal' ? '사용자' : '기업'}
        </button>
      ))}
    </div>
  );
}
