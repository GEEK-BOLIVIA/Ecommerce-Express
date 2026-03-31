// Una vez que Supabase confirme el SIGNED_IN...
const { data: { session } } = await supabase.auth.getSession();

if (session) {
    const response = await fetch('/api/auth/supabase-verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            id: session.user.id,
            email: session.user.email
        })
    });

    const result = await response.json();
    if (result.success) {
        window.location.href = result.redirect;
    } else {
        Swal.fire('Acceso Denegado', result.error, 'error');
        await supabase.auth.signOut();
    }
}
