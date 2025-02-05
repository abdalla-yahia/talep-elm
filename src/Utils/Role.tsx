
export default function Role(role:string):number {
    const Roles = ['USER','ADMIN','TEACHER','ADMIN_TEACHER','MANAGER','OWNER'];
    return Roles.indexOf(role);
}

export function ParseRoles(role:string){
    const Roles = ['USER','ADMIN','TEACHER','ADMIN_TEACHER','MANAGER','OWNER']
   const parser =  [{role:'users',name:'طالب / طالبة'},
        {role:'admins',name:'مشرف / مشرفة'},
        {role:'teachers',name:'مدرس  /مدرسة'},
        {role:'admin-teacher',name:'مشرف عام / مشرفة عام'},
        {role:'managers',name:'  مدير / مديرة'},
        {role:'owner',name:'الدكتور '}];
        const roleIndex = Roles.indexOf(role);
        return parser[roleIndex].role
}
export function JopRoles(role:string){
    const Roles = ['USER','ADMIN','TEACHER','ADMIN_TEACHER','MANAGER','OWNER']
   const parser =  [{role:'users',name:'طالب / طالبة'},
        {role:'admins',name:'مشرف / مشرفة'},
        {role:'teachers',name:'مدرس  /مدرسة'},
        {role:'admin-teacher',name:'مشرف / مشرفة عام'},
        {role:'managers',name:'  مدير/ مديرة'},
        {role:'owner',name:'الدكتور'}];
        const roleIndex = Roles.indexOf(role);
        return parser[roleIndex]?.name
}