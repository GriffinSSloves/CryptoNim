# Development Documentation

## SSH Setup

1. Generate a new SSH key:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/id_ed25519_github
```

2. Add the SSH key to your GitHub account:

   - Copy your public key:

   ```bash
   cat ~/.ssh/id_ed25519_github.pub
   ```

   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste your public key and save

3. Configure Git with your GitHub information:

```bash
git config --global user.name "Your GitHub Username"
git config --global user.email "your_email@example.com"
```

4. Configure SSH to use your key:

```bash
echo -e "Host github.com\n  IdentityFile ~/.ssh/id_ed25519_github\n  User git" > ~/.ssh/config
```

5. Verify your connection:

```bash
ssh -T git@github.com
```
