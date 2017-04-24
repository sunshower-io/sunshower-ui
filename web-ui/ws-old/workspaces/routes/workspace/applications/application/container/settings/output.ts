import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {bindable} from "aurelia-framework";

import * as Xterm from "xterm";

/**
 * Created by dustinlish on 2/22/17.
 */

@autoinject
export class Output {

    lines:string[];

    @bindable
    terminal;

    constructor(private client:HttpClient) {

    }

    activate(items:any, p:any, c:any) : void {

    }

    attached() {
        var term = new Xterm({
            cursorBlink: true,
            cols: 120
        });
        term.open(this.terminal);

        this.lines = [];
        let ls = docs.split('\n'),
            count = 0,
            interval = setInterval(() => {
                if(count < ls.length) {
                    term.writeln(ls[count]);
                    this.lines.push(ls[count]);
                } else {
                    return clearInterval(interval);
                }
                count++;

            }, 500);
    }

}


let docs = `:$ docker build -t test .
Sending build context to Docker daemon 2.048 kB
Step 1/3 : FROM ubuntu:latest
latest: Pulling from library/ubuntu
d54efb8db41d: Already exists 
f8b845f45a87: Already exists 
e8db7bf7c39f: Already exists 
9654c40e9079: Already exists 
6d9ef359eaaa: Already exists 
Digest: sha256:dd7808d8792c9841d0b460122f1acf0a2dd1f56404f8d1e56298048885e45535
Status: Downloaded newer image for ubuntu:latest
 ---> 0ef2e08ed3fa
Step 2/3 : RUN apt-get update && apt-get upgrade -y     && apt-get install -y vim
 ---> Running in b1da0f3f3104
Get:1 http://archive.ubuntu.com/ubuntu xenial InRelease [247 kB]
Get:2 http://archive.ubuntu.com/ubuntu xenial-updates InRelease [102 kB]
Get:3 http://archive.ubuntu.com/ubuntu xenial-security InRelease [102 kB]
Get:4 http://archive.ubuntu.com/ubuntu xenial/main Sources [1103 kB]
Get:5 http://archive.ubuntu.com/ubuntu xenial/restricted Sources [5179 B]
Get:6 http://archive.ubuntu.com/ubuntu xenial/universe Sources [9802 kB]
Get:7 http://archive.ubuntu.com/ubuntu xenial/main amd64 Packages [1558 kB]
Get:8 http://archive.ubuntu.com/ubuntu xenial/restricted amd64 Packages [14.1 kB]
Get:9 http://archive.ubuntu.com/ubuntu xenial/universe amd64 Packages [9827 kB]
Get:10 http://archive.ubuntu.com/ubuntu xenial-updates/main Sources [299 kB]
Get:11 http://archive.ubuntu.com/ubuntu xenial-updates/restricted Sources [3202 B]
Get:12 http://archive.ubuntu.com/ubuntu xenial-updates/universe Sources [183 kB]
Get:13 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 Packages [631 kB]
Get:14 http://archive.ubuntu.com/ubuntu xenial-updates/restricted amd64 Packages [13.2 kB]
Get:15 http://archive.ubuntu.com/ubuntu xenial-updates/universe amd64 Packages [560 kB]
Get:16 http://archive.ubuntu.com/ubuntu xenial-security/main Sources [78.6 kB]
Get:17 http://archive.ubuntu.com/ubuntu xenial-security/restricted Sources [2779 B]
Get:18 http://archive.ubuntu.com/ubuntu xenial-security/universe Sources [28.5 kB]
Get:19 http://archive.ubuntu.com/ubuntu xenial-security/main amd64 Packages [290 kB]
Get:20 http://archive.ubuntu.com/ubuntu xenial-security/restricted amd64 Packages [12.8 kB]
Get:21 http://archive.ubuntu.com/ubuntu xenial-security/universe amd64 Packages [120 kB]
Fetched 25.0 MB in 5s (4773 kB/s)
Reading package lists...
Reading package lists...
Building dependency tree...
Reading state information...
Calculating upgrade...
The following packages will be upgraded:
  init init-system-helpers libc-bin libc6 locales multiarch-support
6 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
Need to get 6479 kB of archives.
After this operation, 0 B of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 init-system-helpers all 1.29ubuntu4 [32.3 kB]
Get:2 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 init amd64 1.29ubuntu4 [4624 B]
Get:3 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 libc6 amd64 2.23-0ubuntu7 [2590 kB]
Get:4 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 locales all 2.23-0ubuntu7 [3222 kB]
Get:5 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 libc-bin amd64 2.23-0ubuntu7 [622 kB]
Get:6 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 multiarch-support amd64 2.23-0ubuntu7 [6826 B]
debconf: delaying package configuration, since apt-utils is not installed
Fetched 6479 kB in 2s (3018 kB/s)
(Reading database ... 7256 files and directories currently installed.)
Preparing to unpack .../init-system-helpers_1.29ubuntu4_all.deb ...
Unpacking init-system-helpers (1.29ubuntu4) over (1.29ubuntu3) ...
Setting up init-system-helpers (1.29ubuntu4) ...
(Reading database ... 7256 files and directories currently installed.)
Preparing to unpack .../init_1.29ubuntu4_amd64.deb ...
Unpacking init (1.29ubuntu4) over (1.29ubuntu3) ...
Setting up init (1.29ubuntu4) ...
(Reading database ... 7256 files and directories currently installed.)
Preparing to unpack .../libc6_2.23-0ubuntu7_amd64.deb ...
debconf: unable to initialize frontend: Dialog
debconf: (TERM is not set, so the dialog frontend is not usable.)
debconf: falling back to frontend: Readline
debconf: unable to initialize frontend: Readline
debconf: (Can't locate Term/ReadLine.pm in @INC (you may need to install the Term::ReadLine module) (@INC contains: /etc/perl /usr/local/lib/x86_64-linux-gnu/perl/5.22.1 /usr/local/share/perl/5.22.1 /usr/lib/x86_64-linux-gnu/perl5/5.22 /usr/share/perl5 /usr/lib/x86_64-linux-gnu/perl/5.22 /usr/share/perl/5.22 /usr/local/lib/site_perl /usr/lib/x86_64-linux-gnu/perl-base .) at /usr/share/perl5/Debconf/FrontEnd/Readline.pm line 7.)
debconf: falling back to frontend: Teletype
Unpacking libc6:amd64 (2.23-0ubuntu7) over (2.23-0ubuntu5) ...
Setting up libc6:amd64 (2.23-0ubuntu7) ...
debconf: unable to initialize frontend: Dialog
debconf: (TERM is not set, so the dialog frontend is not usable.)
debconf: falling back to frontend: Readline
debconf: unable to initialize frontend: Readline
debconf: (Can't locate Term/ReadLine.pm in @INC (you may need to install the Term::ReadLine module) (@INC contains: /etc/perl /usr/local/lib/x86_64-linux-gnu/perl/5.22.1 /usr/local/share/perl/5.22.1 /usr/lib/x86_64-linux-gnu/perl5/5.22 /usr/share/perl5 /usr/lib/x86_64-linux-gnu/perl/5.22 /usr/share/perl/5.22 /usr/local/lib/site_perl /usr/lib/x86_64-linux-gnu/perl-base .) at /usr/share/perl5/Debconf/FrontEnd/Readline.pm line 7.)
debconf: falling back to frontend: Teletype
Processing triggers for libc-bin (2.23-0ubuntu5) ...
(Reading database ... 7256 files and directories currently installed.)
Preparing to unpack .../locales_2.23-0ubuntu7_all.deb ...
Unpacking locales (2.23-0ubuntu7) over (2.23-0ubuntu5) ...
Preparing to unpack .../libc-bin_2.23-0ubuntu7_amd64.deb ...
Unpacking libc-bin (2.23-0ubuntu7) over (2.23-0ubuntu5) ...
Setting up libc-bin (2.23-0ubuntu7) ...
(Reading database ... 7256 files and directories currently installed.)
Preparing to unpack .../multiarch-support_2.23-0ubuntu7_amd64.deb ...
Unpacking multiarch-support (2.23-0ubuntu7) over (2.23-0ubuntu5) ...
Setting up multiarch-support (2.23-0ubuntu7) ...
Setting up locales (2.23-0ubuntu7) ...
debconf: unable to initialize frontend: Dialog
debconf: (TERM is not set, so the dialog frontend is not usable.)
debconf: falling back to frontend: Readline
debconf: unable to initialize frontend: Readline
debconf: (Can't locate Term/ReadLine.pm in @INC (you may need to install the Term::ReadLine module) (@INC contains: /etc/perl /usr/local/lib/x86_64-linux-gnu/perl/5.22.1 /usr/local/share/perl/5.22.1 /usr/lib/x86_64-linux-gnu/perl5/5.22 /usr/share/perl5 /usr/lib/x86_64-linux-gnu/perl/5.22 /usr/share/perl/5.22 /usr/local/lib/site_perl /usr/lib/x86_64-linux-gnu/perl-base .) at /usr/share/perl5/Debconf/FrontEnd/Readline.pm line 7.)
debconf: falling back to frontend: Teletype
Generating locales (this might take a while)...
Generation complete.
Reading package lists...
Building dependency tree...
Reading state information...
The following additional packages will be installed:
  file libexpat1 libgpm2 libmagic1 libmpdec2 libpython3.5 libpython3.5-minimal
  libpython3.5-stdlib libsqlite3-0 libssl1.0.0 mime-support vim-common
  vim-runtime
Suggested packages:
  gpm ctags vim-doc vim-scripts vim-gnome-py2 | vim-gtk-py2 | vim-gtk3-py2
  | vim-athena-py2 | vim-nox-py2
The following NEW packages will be installed:
  file libexpat1 libgpm2 libmagic1 libmpdec2 libpython3.5 libpython3.5-minimal
  libpython3.5-stdlib libsqlite3-0 libssl1.0.0 mime-support vim vim-common
  vim-runtime
0 upgraded, 14 newly installed, 0 to remove and 0 not upgraded.
Need to get 12.2 MB of archives.
After this operation, 58.3 MB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu xenial/main amd64 libgpm2 amd64 1.20.4-6.1 [16.5 kB]
Get:2 http://archive.ubuntu.com/ubuntu xenial/main amd64 libmagic1 amd64 1:5.25-2ubuntu1 [216 kB]
Get:3 http://archive.ubuntu.com/ubuntu xenial/main amd64 file amd64 1:5.25-2ubuntu1 [21.2 kB]
Get:4 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 libexpat1 amd64 2.1.0-7ubuntu0.16.04.2 [71.3 kB]
Get:5 http://archive.ubuntu.com/ubuntu xenial/main amd64 libmpdec2 amd64 2.4.2-1 [82.6 kB]
Get:6 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 libssl1.0.0 amd64 1.0.2g-1ubuntu4.6 [1082 kB]
Get:7 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 libpython3.5-minimal amd64 3.5.2-2ubuntu0~16.04.1 [526 kB]
Get:8 http://archive.ubuntu.com/ubuntu xenial/main amd64 mime-support all 3.59ubuntu1 [31.0 kB]
Get:9 http://archive.ubuntu.com/ubuntu xenial/main amd64 libsqlite3-0 amd64 3.11.0-1ubuntu1 [396 kB]
Get:10 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 libpython3.5-stdlib amd64 3.5.2-2ubuntu0~16.04.1 [2130 kB]
Get:11 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 vim-common amd64 2:7.4.1689-3ubuntu1.2 [103 kB]
Get:12 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 libpython3.5 amd64 3.5.2-2ubuntu0~16.04.1 [1360 kB]
Get:13 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 vim-runtime all 2:7.4.1689-3ubuntu1.2 [5164 kB]
Get:14 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 vim amd64 2:7.4.1689-3ubuntu1.2 [1036 kB]
debconf: delaying package configuration, since apt-utils is not installed
Fetched 12.2 MB in 2s (4148 kB/s)
Selecting previously unselected package libgpm2:amd64.
(Reading database ... 7256 files and directories currently installed.)
Preparing to unpack .../libgpm2_1.20.4-6.1_amd64.deb ...
Unpacking libgpm2:amd64 (1.20.4-6.1) ...
Selecting previously unselected package libmagic1:amd64.
Preparing to unpack .../libmagic1_1%3a5.25-2ubuntu1_amd64.deb ...
Unpacking libmagic1:amd64 (1:5.25-2ubuntu1) ...
Selecting previously unselected package file.
Preparing to unpack .../file_1%3a5.25-2ubuntu1_amd64.deb ...
Unpacking file (1:5.25-2ubuntu1) ...
Selecting previously unselected package libexpat1:amd64.
Preparing to unpack .../libexpat1_2.1.0-7ubuntu0.16.04.2_amd64.deb ...
Unpacking libexpat1:amd64 (2.1.0-7ubuntu0.16.04.2) ...
Selecting previously unselected package libmpdec2:amd64.
Preparing to unpack .../libmpdec2_2.4.2-1_amd64.deb ...
Unpacking libmpdec2:amd64 (2.4.2-1) ...
Selecting previously unselected package libssl1.0.0:amd64.
Preparing to unpack .../libssl1.0.0_1.0.2g-1ubuntu4.6_amd64.deb ...
Unpacking libssl1.0.0:amd64 (1.0.2g-1ubuntu4.6) ...
Selecting previously unselected package libpython3.5-minimal:amd64.
Preparing to unpack .../libpython3.5-minimal_3.5.2-2ubuntu0~16.04.1_amd64.deb ...
Unpacking libpython3.5-minimal:amd64 (3.5.2-2ubuntu0~16.04.1) ...
Selecting previously unselected package mime-support.
Preparing to unpack .../mime-support_3.59ubuntu1_all.deb ...
Unpacking mime-support (3.59ubuntu1) ...
Selecting previously unselected package libsqlite3-0:amd64.
Preparing to unpack .../libsqlite3-0_3.11.0-1ubuntu1_amd64.deb ...
Unpacking libsqlite3-0:amd64 (3.11.0-1ubuntu1) ...
Selecting previously unselected package libpython3.5-stdlib:amd64.
Preparing to unpack .../libpython3.5-stdlib_3.5.2-2ubuntu0~16.04.1_amd64.deb ...
Unpacking libpython3.5-stdlib:amd64 (3.5.2-2ubuntu0~16.04.1) ...
Selecting previously unselected package vim-common.
Preparing to unpack .../vim-common_2%3a7.4.1689-3ubuntu1.2_amd64.deb ...
Unpacking vim-common (2:7.4.1689-3ubuntu1.2) ...
Selecting previously unselected package libpython3.5:amd64.
Preparing to unpack .../libpython3.5_3.5.2-2ubuntu0~16.04.1_amd64.deb ...
Unpacking libpython3.5:amd64 (3.5.2-2ubuntu0~16.04.1) ...
Selecting previously unselected package vim-runtime.
Preparing to unpack .../vim-runtime_2%3a7.4.1689-3ubuntu1.2_all.deb ...
Adding 'diversion of /usr/share/vim/vim74/doc/help.txt to /usr/share/vim/vim74/doc/help.txt.vim-tiny by vim-runtime'
Adding 'diversion of /usr/share/vim/vim74/doc/tags to /usr/share/vim/vim74/doc/tags.vim-tiny by vim-runtime'
Unpacking vim-runtime (2:7.4.1689-3ubuntu1.2) ...
Selecting previously unselected package vim.
Preparing to unpack .../vim_2%3a7.4.1689-3ubuntu1.2_amd64.deb ...
Unpacking vim (2:7.4.1689-3ubuntu1.2) ...
Processing triggers for libc-bin (2.23-0ubuntu7) ...
Setting up libgpm2:amd64 (1.20.4-6.1) ...
Setting up libmagic1:amd64 (1:5.25-2ubuntu1) ...
Setting up file (1:5.25-2ubuntu1) ...
Setting up libexpat1:amd64 (2.1.0-7ubuntu0.16.04.2) ...
Setting up libmpdec2:amd64 (2.4.2-1) ...
Setting up libssl1.0.0:amd64 (1.0.2g-1ubuntu4.6) ...
debconf: unable to initialize frontend: Dialog
debconf: (TERM is not set, so the dialog frontend is not usable.)
debconf: falling back to frontend: Readline
debconf: unable to initialize frontend: Readline
debconf: (Can't locate Term/ReadLine.pm in @INC (you may need to install the Term::ReadLine module) (@INC contains: /etc/perl /usr/local/lib/x86_64-linux-gnu/perl/5.22.1 /usr/local/share/perl/5.22.1 /usr/lib/x86_64-linux-gnu/perl5/5.22 /usr/share/perl5 /usr/lib/x86_64-linux-gnu/perl/5.22 /usr/share/perl/5.22 /usr/local/lib/site_perl /usr/lib/x86_64-linux-gnu/perl-base .) at /usr/share/perl5/Debconf/FrontEnd/Readline.pm line 7.)
debconf: falling back to frontend: Teletype
Setting up libpython3.5-minimal:amd64 (3.5.2-2ubuntu0~16.04.1) ...
Setting up mime-support (3.59ubuntu1) ...
Setting up libsqlite3-0:amd64 (3.11.0-1ubuntu1) ...
Setting up libpython3.5-stdlib:amd64 (3.5.2-2ubuntu0~16.04.1) ...
Setting up vim-common (2:7.4.1689-3ubuntu1.2) ...
Setting up libpython3.5:amd64 (3.5.2-2ubuntu0~16.04.1) ...
Setting up vim-runtime (2:7.4.1689-3ubuntu1.2) ...
Setting up vim (2:7.4.1689-3ubuntu1.2) ...
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/vim (vim) in auto mode
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/vimdiff (vimdiff) in auto mode
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/rvim (rvim) in auto mode
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/rview (rview) in auto mode
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/vi (vi) in auto mode
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/view (view) in auto mode
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/ex (ex) in auto mode
update-alternatives: using /usr/bin/vim.basic to provide /usr/bin/editor (editor) in auto mode
Processing triggers for libc-bin (2.23-0ubuntu7) ...
 ---> bb211c9fe19f
Removing intermediate container b1da0f3f3104
Step 3/3 : CMD /bin/bash
 ---> Running in c856409d19ea
 ---> c70425d76447
Removing intermediate container c856409d19ea
Successfully built c70425d76447`;