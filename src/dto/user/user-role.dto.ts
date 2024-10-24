export class UserWithRoleDto {
  id: string;
  email: string;
  name: string;
  roles: string[];
  additionalData: {
    nim?: string;
    nip?: string;
    jenis_kelamin?: string;
    tanggal_lahir?: Date;
    no_hp?: string;
    prodi?: string;
    tingkat?: number;
    kelas?: string;
  };
}
