import subprocess

# 使用 subprocess 调用 git-filter-repo，强制修改历史
subprocess.run([
    "git", "filter-repo",
    "--force",  # 强制修改历史
    "--commit-callback", """
if commit.author_email == b"lpx@126.com":
    commit.author_email = b"1478706539@qq.com"
    commit.committer_email = b"1478706539@qq.com"
    """
])
